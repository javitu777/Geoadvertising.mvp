const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a SQLite
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Crear tabla si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    advertiser TEXT NOT NULL,
    title TEXT NOT NULL,
    imageUrl TEXT,
    targetLocation TEXT NOT NULL
  )
`);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('GeoAdvertising API is running.');
});

// Obtener campañas
app.get('/api/campaigns', (req, res) => {
  db.all('SELECT * FROM campaigns', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear campaña
app.post('/api/campaigns', (req, res) => {
  const { advertiser, title, imageUrl, targetLocation } = req.body;
  if (!advertiser || !title || !targetLocation) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const stmt = db.prepare('INSERT INTO campaigns (advertiser, title, imageUrl, targetLocation) VALUES (?, ?, ?, ?)');
  stmt.run(advertiser, title, imageUrl, targetLocation, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID });
  });
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
