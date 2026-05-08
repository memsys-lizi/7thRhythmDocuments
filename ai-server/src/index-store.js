import fs from 'node:fs/promises';
import { config } from './config.js';
import { cosineSimilarity, embedText } from './embedding.js';

let cachedIndex = null;

export async function loadAdofaiIndex() {
  if (cachedIndex) return cachedIndex;

  const raw = await fs.readFile(config.adofaiIndexPath, 'utf8');
  cachedIndex = JSON.parse(raw);
  return cachedIndex;
}

export async function getIndexStatus() {
  try {
    const index = await loadAdofaiIndex();
    return {
      loaded: true,
      game: index.game,
      embeddingProvider: index.embeddingProvider || 'api',
      embeddingModel: index.embeddingModel,
      documents: index.documents,
      chunks: index.chunks,
      createdAt: index.createdAt
    };
  } catch (error) {
    return {
      loaded: false,
      game: 'adofai',
      error: error.code === 'ENOENT' ? '索引文件不存在，请先运行 pnpm --dir ai-server index:adofai' : error.message
    };
  }
}

export async function searchAdofai(question, topK = config.searchTopK) {
  const index = await loadAdofaiIndex();
  const queryEmbedding = await embedText(question);

  return index.items
    .map((item) => {
      const vectorScore = cosineSimilarity(queryEmbedding, item.embedding);
      return {
        id: item.id,
        game: item.game,
        title: item.title,
        path: item.path,
        url: item.url,
        text: item.text,
        score: vectorScore
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
