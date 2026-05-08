import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';

const MAX_CHUNK_CHARS = 1800;
const MIN_CHUNK_CHARS = 80;

export async function readMarkdownDocs(docsDir) {
  const entries = await fg('**/*.md', {
    cwd: docsDir,
    absolute: true,
    onlyFiles: true,
    ignore: ['**/node_modules/**', '**/.*/**', '_sidebar.md', 'home.md', 'progress.md']
  });

  const docs = [];
  for (const filePath of entries.sort()) {
    const relativePath = path.relative(docsDir, filePath).replaceAll('\\', '/');
    const text = await fs.readFile(filePath, 'utf8');
    docs.push({
      filePath,
      relativePath,
      route: toDocsifyRoute(relativePath),
      text
    });
  }
  return docs;
}

export function chunkMarkdownDoc(doc) {
  const lines = doc.text.split(/\r?\n/);
  const chunks = [];
  const headingStack = [];
  let buffer = [];
  let chunkIndex = 0;

  function currentTitle() {
    const compact = headingStack.filter(Boolean);
    if (compact.length > 0) return compact.join(' / ');
    return titleFromPath(doc.relativePath);
  }

  function flush() {
    const raw = buffer.join('\n').trim();
    buffer = [];
    const normalized = normalizeMarkdown(raw);
    if (normalized.length < MIN_CHUNK_CHARS) return;

    for (const part of splitLongText(normalized, MAX_CHUNK_CHARS)) {
      chunks.push({
        id: `${doc.relativePath}#${chunkIndex}`,
        game: 'adofai',
        title: currentTitle(),
        path: doc.relativePath,
        url: doc.route,
        text: part
      });
      chunkIndex += 1;
    }
  }

  for (const line of lines) {
    const heading = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (heading) {
      flush();
      const level = heading[1].length;
      headingStack[level - 1] = stripMarkdownInline(heading[2]);
      headingStack.length = level;
      continue;
    }

    if (line.trim() === '') {
      if (buffer.join('\n').length >= MAX_CHUNK_CHARS) flush();
      else buffer.push(line);
      continue;
    }

    buffer.push(line);
    if (buffer.join('\n').length >= MAX_CHUNK_CHARS) flush();
  }

  flush();
  return chunks;
}

function splitLongText(text, maxChars) {
  if (text.length <= maxChars) return [text];

  const paragraphs = text.split(/\n{2,}/);
  const parts = [];
  let current = '';

  for (const paragraph of paragraphs) {
    if ((current + '\n\n' + paragraph).trim().length > maxChars && current.trim()) {
      parts.push(current.trim());
      current = paragraph;
    } else {
      current = `${current}\n\n${paragraph}`.trim();
    }
  }

  if (current.trim()) parts.push(current.trim());
  return parts.flatMap((part) => hardSplit(part, maxChars));
}

function hardSplit(text, maxChars) {
  if (text.length <= maxChars) return [text];

  const parts = [];
  for (let i = 0; i < text.length; i += maxChars) {
    parts.push(text.slice(i, i + maxChars));
  }
  return parts;
}

function normalizeMarkdown(text) {
  return text
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```[a-zA-Z0-9_-]*\n?/g, '').replace(/```/g, ''))
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

function stripMarkdownInline(text) {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/[*_~]/g, '')
    .trim();
}

function titleFromPath(relativePath) {
  return relativePath.replace(/\.md$/i, '').replaceAll('/', ' / ');
}

function toDocsifyRoute(relativePath) {
  const noExt = relativePath.replace(/\.md$/i, '');
  if (noExt === 'home') return '/#/';
  if (noExt === '_sidebar') return '/#/_sidebar';
  return `/#/${noExt}`;
}
