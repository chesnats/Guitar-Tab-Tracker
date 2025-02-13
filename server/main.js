const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tabs = [];

// POST route to create a new tab
app.post('/tabs', (req, res) => {
  const { title, artist, difficulty, tab, videoLink } = req.body;
  if (!title || !artist || !difficulty || !tab) {
    return res.status(400).json({message: 'Missing required fields'});
  }
  const id = Date.now();
  const newTab = { id, title, artist, difficulty, tab, videoLink };
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
  res.status(200).json(tab);
});

// DELETE route to remove a tab by ID
app.delete('/tabs/:id', (req, res) => {
  const tabId = parseInt(req.params.id);
  const tabIndex = tabs.findIndex(tab => tab.id === tabId);
  if (tabIndex === -1) {
    return res.status(404).json({ message: 'Tab not found' });
  }
  const removedTab = tabs.splice(tabIndex, 1);
  console.log('Tab removed:', removedTab);
  res.status(200).json({ message: 'Tab removed successfully' });
});

// POST route for changing password
app.post('/change_password', (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    
    // Validate request body
    if (!old_password || !new_password) {
      return res.status(400).json({ 
        success: false,
        message: 'Old password and new password are required' 
      });
    }

    console.log('Password change request:', { old_password, new_password });
    
    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Error in change password:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error while changing password'
    });
  }
});

// PUT route for updating user profile
app.put('/user_profile', (req, res) => {
  const { first_name, last_name, job_position, address, department, primary_email, secondary_email } = req.body;
  if (!first_name || !last_name || !primary_email) {
    return res.status(400).json({ message: 'First name, last name, and primary email are required' });
  }
  
  console.log('User profile updated:', req.body);
  res.status(200).json({
    message: 'User profile updated successfully',
    updatedProfile: req.body
  });
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});