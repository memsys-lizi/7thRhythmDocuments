import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(serverRoot, '..');

dotenv.config({ path: path.join(serverRoot, '.env') });
dotenv.config();

function intFromEnv(name, fallback) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const config = {
  serverRoot,
  repoRoot,
  host: process.env.AI_HOST || '0.0.0.0',
  port: intFromEnv('AI_PORT', 1970),
  corsOrigin: process.env.AI_CORS_ORIGIN || '*',
  deepseekApiKey: process.env.DEEPSEEK_API_KEY || '',
  deepseekBaseUrl: (process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, ''),
  deepseekModel: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
  embeddingModel: process.env.AI_EMBEDDING_MODEL || 'text-embedding-3-small',
  embeddingApiKey: process.env.AI_EMBEDDING_API_KEY || process.env.DEEPSEEK_API_KEY || '',
  embeddingBaseUrl: (process.env.AI_EMBEDDING_BASE_URL || process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com').replace(/\/+$/, ''),
  searchTopK: intFromEnv('AI_SEARCH_TOP_K', 8),
  maxContextChars: intFromEnv('AI_MAX_CONTEXT_CHARS', 12000),
  adofaiDocsDir: path.join(repoRoot, 'adofai', 'docs'),
  adofaiIndexPath: path.join(serverRoot, 'data', 'adofai-vectors.json')
};
