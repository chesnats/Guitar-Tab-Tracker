const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());  // Enable CORS for all routes

app.use(express.json()); // Allow the backend to parse JSON

let tabs = [];

app.post('/tabs', (req, res) => {
  const { title, artist, difficulty, tab } = req.body;

  if (!title || !artist || !difficulty || !tab) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Save to a database or in-memory storage (temporary example)
  const newTab = { title, artist, difficulty, tab };
  console.log('Tab created:', newTab);

  // Return the newly created tab
  res.status(201).json(newTab);
});


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
