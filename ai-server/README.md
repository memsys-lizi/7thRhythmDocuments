# ADOFAI 文档 AI 问答服务

这是独立 Node.js 服务，不替代现有 docsify 服务。它读取 `adofai/docs` 生成本地 embedding 索引，并通过 DeepSeek API 生成基于文档的中文回答。

## 使用

1. 安装依赖：

```bash
pnpm --dir ai-server install
```

2. 创建配置：

```bash
cp ai-server/.env.example ai-server/.env
```

3. 填写 `DEEPSEEK_API_KEY`。

4. 配置 embedding。

服务只使用在线 OpenAI 兼容 embedding API。`AI_EMBEDDING_API_KEY` 和 `AI_EMBEDDING_BASE_URL` 留空时，会复用 `DEEPSEEK_API_KEY` 和 `DEEPSEEK_BASE_URL`。注意：聊天接口和 embedding 接口不是同一个能力，只有服务商明确支持 `/embeddings` 时才能用于生成索引。

```env
AI_EMBEDDING_API_KEY=你的向量模型key
AI_EMBEDDING_BASE_URL=https://example.com/v1
AI_EMBEDDING_MODEL=你的embedding模型名
```

如果服务商要求 OpenAI 兼容路径，`AI_EMBEDDING_BASE_URL` 和 `DEEPSEEK_BASE_URL` 要写到 `/v1`，例如 `https://example.com/v1`。如果写成网站首页地址，索引命令会收到 HTML 而不是 JSON。

如果当前 DeepSeek 聊天服务不提供 embedding，请单独配置支持 embedding 的服务：

```env
AI_EMBEDDING_API_KEY=你的embedding服务key
AI_EMBEDDING_BASE_URL=https://embedding-provider.example/v1
AI_EMBEDDING_MODEL=服务商提供的embedding模型名
```

5. 生成 ADOFAI 索引：

```bash
pnpm --dir ai-server index:adofai
```

6. 启动服务：

```bash
pnpm --dir ai-server serve
```

默认监听 `0.0.0.0:1970`，可在 `.env` 中修改。

## API

### GET /health

返回服务状态、索引是否加载、文档块数量。

### POST /api/search

只检索文档片段，不调用 DeepSeek。

```json
{
  "game": "adofai",
  "question": "ADOFAI 的判定逻辑在哪里？"
}
```

### POST /api/ask

检索文档片段后调用 DeepSeek 回答。

```json
{
  "game": "adofai",
  "question": "ADOFAI 的判定逻辑在哪里？"
}
```

## 说明

- API Key 只放在 `ai-server/.env`，不会暴露给浏览器。
- 当前只支持 `game: "adofai"`。
- DeepSeek 负责聊天回答；embedding 使用 OpenAI 兼容在线 API。
- 如果文档更新，需要重新运行 `pnpm --dir ai-server index:adofai`。
