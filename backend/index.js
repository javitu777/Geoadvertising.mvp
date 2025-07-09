 const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 10000;
const db = new sqlite3.Database("./anuncios.db");

app.use(cors());
app.use(express.json());

// ⚠️ API Keys válidas temporales (en producción esto iría en una base de datos)
const apiKeys = {
  "juego-demo-123": "Juego de Carreras",
  "abc456": "Cliente de prueba"
};

// Endpoint para obtener un anuncio
app.get("/api/get-ad", (req, res) => {
  const { location, key } = req.query;

  if (!key || !apiKeys[key]) {
    return res.status(403).json({ error: "Invalid or missing API Key" });
  }

  if (!location) {
    return res.status(400).json({ error: "Missing location" });
  }

  db.all(
    `SELECT * FROM campañas WHERE targetType = 'ciudad' AND LOWER(targetArea) = LOWER(?) ORDER BY RANDOM() LIMIT 1`,
    [location],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      if (rows.length === 0) {
        return res.status(404).json({ error: "No ads found" });
      }
      res.json(rows[0]);
    }
  );
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
