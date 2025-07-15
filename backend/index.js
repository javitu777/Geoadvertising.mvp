 const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

// Guardado en memoria
const campaigns = [];

// Crear campaña
app.post('/api/campaigns', (req, res) => {
  const { advertiser, title, imageUrl, targetType, targetArea } = req.body;

  if (!advertiser || !title || !imageUrl || !targetType || !targetArea) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  campaigns.push({ advertiser, title, imageUrl, targetType, targetArea });
  res.status(201).json({ message: 'Campaña guardada con éxito' });
});

// Obtener campañas
app.get('/api/campaigns', (req, res) => {
  res.json(campaigns);
});

app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
