const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const PLANS_FILE = path.join(__dirname, 'plans.json');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/plans', async (req, res) => {
  const raw = await fs.readFile(PLANS_FILE, 'utf8');
  res.json(JSON.parse(raw));
});

app.post('/plans', async (req, res) => {
  const incoming = req.body;
  const raw = await fs.readFile(PLANS_FILE, 'utf8');
  const stored = JSON.parse(raw);
  Object.assign(stored, incoming);
  await fs.writeFile(PLANS_FILE, JSON.stringify(stored, null, 2), 'utf8');
  res.json({ status: 'ok', written: incoming });
});

app.listen(PORT, () => {
  console.log(`Server listening: http://localhost:${PORT}`);
});
