 const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

let campañas = [];

app.get('/', (req, res) => {
  res.send('GeoAdvertising API is running.');
});

app.post('/api/campaigns', (req, res) => {
  const { advertiser, title, imageUrl, targetType, targetArea } = req.body;

  if (!advertiser || !title || !imageUrl || !targetType || !targetArea) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const nuevaCampaña = { advertiser, title, imageUrl, targetType, targetArea };
  campañas.push(nuevaCampaña);

  res.status(201).json({ message: 'Campaña creada', campaña: nuevaCampaña });
});

app.get('/api/campaigns', (req, res) => {
  res.json(campañas);
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
