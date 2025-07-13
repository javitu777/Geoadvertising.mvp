const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Campañas almacenadas en memoria (puedes cambiar a una DB luego)
const campaigns = [];

// Ruta para subir campañas
app.post('/api/campaigns', (req, res) => {
  const { advertiser, title, imageUrl, targetType, targetArea } = req.body;

  if (!advertiser || !title || !imageUrl || !targetType || !targetArea) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newCampaign = { advertiser, title, imageUrl, targetType, targetArea };
  campaigns.push(newCampaign);
  return res.status(201).json({ message: 'Campaña guardada con éxito' });
});

// Ruta para obtener campañas (por ciudad)
app.get('/api/campaigns', (req, res) => {
  res.json(campaigns);
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
