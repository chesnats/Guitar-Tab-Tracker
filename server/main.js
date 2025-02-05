const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());  // Enable CORS for all routes
app.use(express.json()); // Allow the backend to parse JSON

let tabs = [];  // Temporary storage for tabs (can be replaced with a database)

// POST route to create a new tab
app.post('/tabs', (req, res) => {
  const { title, artist, difficulty, tab } = req.body;

  if (!title || !artist || !difficulty || !tab) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const id = tabs.length + 1; // Generate a unique ID
  const newTab = { id, title, artist, difficulty, tab };
  tabs.push(newTab);
  console.log('Tab created:', newTab);
  res.status(201).json(newTab);
});

// GET route to fetch all tabs
app.get('/tabs', (req, res) => {
  res.status(200).json(tabs);
});

// GET route to fetch a specific tab by its ID
app.get('/tabs/:id', (req, res) => {
  const tabId = parseInt(req.params.id);
  const tab = tabs.find(t => t.id === tabId);

  if (!tab) {
    return res.status(404).json({ message: 'Tab not found' });
  }

  res.status(200).json(tab);
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
