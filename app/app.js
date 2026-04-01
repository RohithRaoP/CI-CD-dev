const express = require('express');
const app = express();
app.use(express.json());

// In-memory feature toggles
const features = { login: true, payment: false };

// Endpoint to list all features
app.get('/', (req, res) => {
  res.send(`
    <h1>🚀 Dev Environment Deployment Successful</h1>
    <p>Application is running and ready for testing & validation.</p>
  `);
});

// Endpoint to update a feature toggle
app.post('/features', (req, res) => {
  const { feature, value } = req.body;
  if (feature in features) {
    features[feature] = value;
    res.json({ success: true, features });
  } else {
    res.status(400).json({ success: false, msg: 'Feature not found' });
  }
});

// Start server
app.listen(3000, () => console.log('Feature Toggle Service running on port 3000'));
