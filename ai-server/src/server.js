import cors from 'cors';
import express from 'express';
import { config } from './config.js';
import { askDeepSeek, streamDeepSeek } from './deepseek.js';
import { getIndexStatus, searchAdofai } from './index-store.js';

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', async (req, res) => {
  const index = await getIndexStatus();
  res.json({
    ok: true,
    service: 'rhythm-doc-ai-server',
    supportedGames: ['adofai'],
    index
  });
});

app.post('/api/search', async (req, res, next) => {
  try {
    const { game, question, topK } = readQuestion(req.body);
    ensureAdofai(game);
    const sources = await searchAdofai(question, topK);
    res.json({ sources: publicSources(sources) });
  } catch (error) {
    next(error);
  }
});

app.post('/api/ask', async (req, res, next) => {
  try {
    const { game, question, topK } = readQuestion(req.body);
    ensureAdofai(game);
    const sources = await searchAdofai(question, topK);
    const answer = await askDeepSeek(question, sources);
    res.json({
      answer,
      sources: publicSources(sources)
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/ask-stream', async (req, res, next) => {
  try {
    const { game, question, topK } = readQuestion(req.body);
    ensureAdofai(game);
    const sources = await searchAdofai(question, topK);

    res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('X-Accel-Buffering', 'no');
    res.flushHeaders?.();

    writeJsonLine(res, {
      type: 'sources',
      sources: publicSources(sources)
    });

    await streamDeepSeek(question, sources, async (delta) => {
      writeJsonLine(res, {
        type: 'delta',
        delta
      });
    });

    writeJsonLine(res, { type: 'done' });
    res.end();
  } catch (error) {
    if (res.headersSent) {
      writeJsonLine(res, {
        type: 'error',
        error: error.message || '服务内部错误。'
      });
      res.end();
      return;
    }
    next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ error: '接口不存在。' });
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  res.status(status).json({
    error: error.message || '服务内部错误。'
  });
});

app.listen(config.port, config.host, () => {
  console.log(`ADOFAI 文档 AI 服务已启动：http://${config.host}:${config.port}`);
});

function readQuestion(body) {
  const game = body?.game || 'adofai';
  const question = typeof body?.question === 'string' ? body.question.trim() : '';
  const topK = Number.isFinite(body?.topK) ? body.topK : config.searchTopK;

  if (!question) {
    const error = new Error('question 不能为空。');
    error.statusCode = 400;
    throw error;
  }

  return {
    game,
    question,
    topK: Math.max(1, Math.min(20, topK))
  };
}

function ensureAdofai(game) {
  if (game !== 'adofai') {
    const error = new Error('当前服务只支持 game: "adofai"。');
    error.statusCode = 400;
    throw error;
  }
}

function publicSources(sources) {
  return sources.map((source) => ({
    title: source.title,
    url: source.url,
    path: source.path,
    score: Number(source.score.toFixed(4)),
    text: source.text
  }));
}

function writeJsonLine(res, data) {
  res.write(`${JSON.stringify(data)}\n`);
}
