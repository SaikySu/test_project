import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';
const SEED_DIR = path.resolve(process.cwd(), 'data');
// DATA_DIR can point at a persistent disk (e.g. /var/data on Render)
const DATA_DIR = path.resolve(process.env.DATA_DIR || SEED_DIR);
const YAML_PATH = path.join(DATA_DIR, 'garden_content.yaml');
const STATS_PATH = path.join(DATA_DIR, 'stats.json');
const COMMENTS_PATH = path.join(DATA_DIR, 'comments.json');

// Seed an empty persistent disk with the bundled data files
if (DATA_DIR !== SEED_DIR) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  for (const file of ['garden_content.yaml', 'stats.json', 'comments.json']) {
    const src = path.join(SEED_DIR, file);
    const dest = path.join(DATA_DIR, file);
    if (!fs.existsSync(dest) && fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }
}

app.use(express.json({ limit: '10mb' }));

app.get('/healthz', (_req: Request, res: Response) => {
  res.json({ ok: true });
});

// Helper to safely read JSON
function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as T;
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

// Helper to safely write JSON
function writeJsonFile<T>(filePath: string, data: T) {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// 1. API: Get YAML content
app.get('/api/content.yaml', (_req: Request, res: Response) => {
  try {
    if (!fs.existsSync(YAML_PATH)) {
      return res.status(404).json({ error: 'YAML file not found' });
    }
    const yamlData = fs.readFileSync(YAML_PATH, 'utf-8');
    if (_req.query.download === 'true') {
      res.setHeader('Content-Disposition', 'attachment; filename="digital-garden.yaml"');
    }
    res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
    res.send(yamlData);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 2. API: Update YAML content
app.post('/api/content.yaml', (req: Request, res: Response) => {
  if (ADMIN_TOKEN && req.get('x-admin-token') !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Admin token required' });
  }
  try {
    const { yamlText } = req.body;
    if (!yamlText || typeof yamlText !== 'string') {
      return res.status(400).json({ error: 'yamlText is required as string' });
    }
    // Validate YAML syntax
    yaml.load(yamlText);

    // Save to disk
    fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(YAML_PATH, yamlText, 'utf-8');
    res.json({ success: true, message: 'YAML updated successfully' });
  } catch (err: any) {
    res.status(400).json({ error: 'Invalid YAML format: ' + err.message });
  }
});

// 3. API: Get Visitor Stats
app.get('/api/views', (_req: Request, res: Response) => {
  const stats = readJsonFile(STATS_PATH, {
    totalViews: 1420,
    uniqueVisitors: 894,
    postViews: {} as Record<string, number>,
  });
  res.json(stats);
});

// 4. API: Hit / Increment Visitor Count
app.post('/api/views/hit', (req: Request, res: Response) => {
  const { slug } = req.body || {};
  const stats = readJsonFile(STATS_PATH, {
    totalViews: 1420,
    uniqueVisitors: 894,
    postViews: {} as Record<string, number>,
  });

  stats.totalViews = (stats.totalViews || 0) + 1;
  if (slug && typeof slug === 'string') {
    stats.postViews = stats.postViews || {};
    stats.postViews[slug] = (stats.postViews[slug] || 0) + 1;
  }

  writeJsonFile(STATS_PATH, stats);
  res.json(stats);
});

// 5. API: Get Comments
app.get('/api/comments', (req: Request, res: Response) => {
  const slug = req.query.slug as string | undefined;
  const comments = readJsonFile<any[]>(COMMENTS_PATH, []);
  if (slug) {
    const filtered = comments.filter((c) => c.slug === slug);
    return res.json(filtered);
  }
  res.json(comments);
});

// 6. API: Post Comment
app.post('/api/comments', (req: Request, res: Response) => {
  const { slug, name, content } = req.body;
  if (!name || !content) {
    return res.status(400).json({ error: 'Name and content are required' });
  }

  const comments = readJsonFile<any[]>(COMMENTS_PATH, []);
  const newComment = {
    id: 'c_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    slug: slug || 'general',
    name: name.trim().slice(0, 80),
    content: content.trim().slice(0, 2000),
    createdAt: new Date().toISOString(),
  };

  comments.unshift(newComment);
  writeJsonFile(COMMENTS_PATH, comments);
  res.status(201).json(newComment);
});

// Integrate Vite Middleware
async function start() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Digital Garden server listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
