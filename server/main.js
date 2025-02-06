const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tabs = [];

// POST route to create a new tab
app.post('/tabs', (req, res) => {
  const { title, artist, difficulty, tab, youtubeLink } = req.body; // Include youtubeLink

  if (!title || !artist || !difficulty || !tab) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const id = Date.now(); // Use timestamp as a unique ID
  const newTab = { id, title, artist, difficulty, tab, youtubeLink }; // Add youtubeLink here
  tabs.push(newTab);
  console.log('Tab created:', newTab);
  res.status(201).json(newTab);
});


// GET route to fetch all tabs
app.get('/tabs', (req, res) => {
  res.status(200).json(tabs);
});

// GET route to fetch a single tab by ID
app.get('/tabs/:id', (req, res) => {
  const tabId = parseInt(req.params.id);
  const tab = tabs.find(tab => tab.id === tabId);

  if (!tab) {
    return res.status(404).json({ message: 'Tab not found' });
  }

  res.status(200).json(tab); // Return the specific tab
});

// DELETE route to remove a tab by ID
app.delete('/tabs/:id', (req, res) => {
  const tabId = parseInt(req.params.id);
  const tabIndex = tabs.findIndex(tab => tab.id === tabId);

  if (tabIndex === -1) {
    return res.status(404).json({ message: 'Tab not found' });
  }

  const removedTab = tabs.splice(tabIndex, 1); // Remove the tab from the array
  console.log('Tab removed:', removedTab);
  res.status(200).json({ message: 'Tab removed successfully' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
