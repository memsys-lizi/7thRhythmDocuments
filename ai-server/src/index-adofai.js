import fs from 'node:fs/promises';
import path from 'node:path';
import { config } from './config.js';
import { embedText } from './embedding.js';
import { chunkMarkdownDoc, readMarkdownDocs } from './markdown.js';

async function main() {
  console.log(`读取 ADOFAI 文档：${config.adofaiDocsDir}`);
  const docs = await readMarkdownDocs(config.adofaiDocsDir);
  const chunks = docs.flatMap(chunkMarkdownDoc);

  console.log(`发现 ${docs.length} 个 Markdown 文件，生成 ${chunks.length} 个文档块。`);
  const embeddedChunks = [];

  for (let i = 0; i < chunks.length; i += 1) {
    const chunk = chunks[i];
    const embedding = await embedText(`${chunk.title}\n\n${chunk.text}`);
    embeddedChunks.push({ ...chunk, embedding });

    if ((i + 1) % 10 === 0 || i === chunks.length - 1) {
      console.log(`已生成向量 ${i + 1}/${chunks.length}`);
    }
  }

  const index = {
    version: 1,
    game: 'adofai',
    source: 'adofai/docs',
    embeddingProvider: 'api',
    embeddingModel: config.embeddingModel,
    createdAt: new Date().toISOString(),
    documents: docs.length,
    chunks: embeddedChunks.length,
    items: embeddedChunks
  };

  await fs.mkdir(path.dirname(config.adofaiIndexPath), { recursive: true });
  await fs.writeFile(config.adofaiIndexPath, `${JSON.stringify(index)}\n`, 'utf8');
  console.log(`索引已写入：${config.adofaiIndexPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
