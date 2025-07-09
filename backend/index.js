const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json()); // 👈 Aquí está la clave

const db = new sqlite3.Database("./ads.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS campaigns (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      advertiser TEXT,
      title TEXT,
      imageUrl TEXT,
      targetType TEXT,
      targetLocation TEXT,
      targetArea TEXT
    )
  `);
});

app.post("/api/campaigns", (req, res) => {
  const { advertiser, title, imageUrl, targetType, targetLocation, targetArea } = req.body;

  if (!advertiser || !title || !imageUrl || !targetType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (targetType === "ciudad" && !targetLocation) {
    return res.status(400).json({ error: "Missing targetLocation" });
  }

  if (targetType === "mapa" && !targetArea) {
    return res.status(400).json({ error: "Missing targetArea" });
  }

  const targetAreaStr = targetArea ? JSON.stringify(targetArea) : null;

  db.run(
    `INSERT INTO campaigns (advertiser, title, imageUrl, targetType, targetLocation, targetArea)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [advertiser, title, imageUrl, targetType, targetLocation || null, targetAreaStr],
    function (err) {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ id: this.lastID });
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
