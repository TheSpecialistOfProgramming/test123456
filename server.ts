import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFile } from 'child_process';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Endpoint to process and dispatch receipt using Python
app.post('/api/send-instagram-receipt', (req, res) => {
  const bookingData = req.body;
  const jsonPayload = JSON.stringify(bookingData);

  execFile('python3', [path.join(__dirname, 'app.py'), jsonPayload], (error, stdout, stderr) => {
    if (error) {
      console.error('Python execution error:', error, stderr);
      return res.status(500).json({
        success: false,
        error: 'Failed to execute receipt dispatcher via Python',
        details: stderr || error.message
      });
    }

    try {
      const parsed = JSON.parse(stdout);
      return res.json(parsed);
    } catch (parseErr) {
      return res.json({
        success: true,
        status: 'dispatched',
        raw: stdout,
        direct_url: 'https://ig.me/m/hydrodetailing.brisbane'
      });
    }
  });
});

// API Endpoint to check past dispatches
app.get('/api/instagram-receipts', (req, res) => {
  const logPath = path.join(__dirname, 'instagram_dispatches.json');
  if (fs.existsSync(logPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(logPath, 'utf-8'));
      return res.json({ success: true, count: data.length, dispatches: data });
    } catch (e) {
      return res.json({ success: true, dispatches: [] });
    }
  }
  return res.json({ success: true, count: 0, dispatches: [] });
});

app.get('/standalone', (req, res) => {
  res.sendFile(path.join(__dirname, 'standalone.html'));
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
