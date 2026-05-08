import { config } from './config.js';

export async function embedText(text) {
  if (!config.embeddingApiKey) {
    throw new Error('缺少 embedding API Key，请配置 AI_EMBEDDING_API_KEY 或 DEEPSEEK_API_KEY。');
  }
  if (!config.embeddingBaseUrl) {
    throw new Error('缺少 embedding API Base URL，请配置 AI_EMBEDDING_BASE_URL 或 DEEPSEEK_BASE_URL。');
  }
  if (config.embeddingModel.startsWith('Xenova/')) {
    throw new Error('当前已移除本地 embedding 模型，请把 AI_EMBEDDING_MODEL 改成在线 embedding 模型名，例如服务商提供的 text-embedding 系列模型。');
  }

  const response = await fetch(`${config.embeddingBaseUrl}/embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.embeddingApiKey}`
    },
    body: JSON.stringify({
      model: config.embeddingModel,
      input: text
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Embedding API 调用失败：${response.status} ${body || '无响应正文'}。请确认 AI_EMBEDDING_BASE_URL 指向支持 /embeddings 的 OpenAI 兼容接口。`);
  }

  const body = await response.text();
  let data;
  try {
    data = JSON.parse(body);
  } catch {
    throw new Error(`Embedding API 没有返回 JSON，请检查 AI_EMBEDDING_BASE_URL 是否为 OpenAI 兼容接口地址。响应开头：${body.slice(0, 120)}`);
  }
  const embedding = data.data?.[0]?.embedding;
  if (!Array.isArray(embedding)) {
    throw new Error('Embedding API 返回格式不包含 data[0].embedding。');
  }
  return embedding;
}

export function cosineSimilarity(a, b) {
  if (!a?.length || !b?.length || a.length !== b.length) return 0;

  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
