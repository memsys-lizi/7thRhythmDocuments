import { config } from './config.js';

export async function askDeepSeek(question, sources) {
  if (!config.deepseekApiKey) {
    const error = new Error('缺少 DEEPSEEK_API_KEY，请在 ai-server/.env 中配置。');
    error.statusCode = 500;
    throw error;
  }

  const context = buildContext(sources);
  const response = await fetch(`${config.deepseekBaseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.deepseekApiKey}`
    },
    body: JSON.stringify({
      model: config.deepseekModel,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content: [
            '你是 ADOFAI 源码文档问答助手。',
            '只能根据用户问题下方提供的文档片段回答。',
            '如果文档片段没有足够信息，必须明确说明“文档中没有找到足够信息”。',
            '回答使用中文，保持简洁准确，不要编造源码事实。',
            '回答中可以提到相关类、方法、字段和页面标题。'
          ].join('\n')
        },
        {
          role: 'user',
          content: `问题：${question}\n\n文档片段：\n${context}`
        }
      ]
    })
  });

  if (!response.ok) {
    const body = await response.text();
    const error = new Error(`DeepSeek API 调用失败：${response.status} ${body}`);
    error.statusCode = response.status;
    throw error;
  }

  const body = await response.text();
  let data;
  try {
    data = JSON.parse(body);
  } catch {
    const error = new Error(`DeepSeek API 没有返回 JSON，请检查 DEEPSEEK_BASE_URL 是否为 OpenAI 兼容接口地址。响应开头：${body.slice(0, 120)}`);
    error.statusCode = 502;
    throw error;
  }
  return data.choices?.[0]?.message?.content?.trim() || 'DeepSeek 没有返回回答内容。';
}

export async function streamDeepSeek(question, sources, onDelta) {
  if (!config.deepseekApiKey) {
    const error = new Error('缺少 DEEPSEEK_API_KEY，请在 ai-server/.env 中配置。');
    error.statusCode = 500;
    throw error;
  }

  const context = buildContext(sources);
  const response = await fetch(`${config.deepseekBaseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.deepseekApiKey}`
    },
    body: JSON.stringify({
      model: config.deepseekModel,
      temperature: 0.2,
      stream: true,
      messages: [
        {
          role: 'system',
          content: [
            '你是 ADOFAI 源码文档问答助手。',
            '只能根据用户问题下方提供的文档片段回答。',
            '如果文档片段没有足够信息，必须明确说明“文档中没有找到足够信息”。',
            '回答使用中文，保持简洁准确，不要编造源码事实。',
            '回答中可以提到相关类、方法、字段和页面标题。'
          ].join('\n')
        },
        {
          role: 'user',
          content: `问题：${question}\n\n文档片段：\n${context}`
        }
      ]
    })
  });

  if (!response.ok) {
    const body = await response.text();
    const error = new Error(`DeepSeek API 调用失败：${response.status} ${body}`);
    error.statusCode = response.status;
    throw error;
  }

  if (!response.body) {
    throw new Error('DeepSeek API 没有返回可读取的流。');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data:')) continue;

      const payload = trimmed.slice(5).trim();
      if (payload === '[DONE]') return;

      let data;
      try {
        data = JSON.parse(payload);
      } catch {
        continue;
      }

      const delta = data.choices?.[0]?.delta?.content || '';
      if (delta) {
        await onDelta(delta);
      }
    }
  }
}

function buildContext(sources) {
  let used = 0;
  const parts = [];

  for (const source of sources) {
    const block = [
      `标题：${source.title}`,
      `来源：${source.url}`,
      `内容：${source.text}`
    ].join('\n');

    if (used + block.length > config.maxContextChars) break;
    used += block.length;
    parts.push(block);
  }

  return parts.join('\n\n---\n\n');
}
