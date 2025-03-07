// src/services/tabService.js

// Data storage (using localStorage)
let tabs = JSON.parse(localStorage.getItem('tabs')) || [];
let userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];

// Helper function to save data to localStorage
const saveData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Function to create a new tab
export const createTab = (title, artist, difficulty, tab, videoLink) => {
  if (!title || !artist || !difficulty || !tab) {
    throw new Error('Missing required fields');
  }
  const id = Date.now();
  const createdAt = new Date().toISOString();
  const newTab = { id, title, artist, difficulty, tab, videoLink, createdAt };
  tabs.push(newTab);
  saveData('tabs', tabs); // Save to localStorage
  console.log('Tab created:', newTab);
  return newTab;
};

// Function to fetch all tabs
export const getAllTabs = () => {
  const sortedTabs = [...tabs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log('Tabs fetched:', sortedTabs);
  return sortedTabs;
};

// Function to fetch a single tab by ID
export const getTabById = (tabId) => {
  const tab = tabs.find(tab => tab.id === tabId);
  if (!tab) {
    throw new Error('Tab not found');
  }
  return tab;
};

// Function to delete a tab by ID
export const deleteTab = (tabId) => {
  const tabIndex = tabs.findIndex(tab => tab.id === tabId);
  if (tabIndex === -1) {
    throw new Error('Tab not found');
  }
  const removedTab = tabs.splice(tabIndex, 1);
  saveData('tabs', tabs); // Update localStorage
  console.log('Tab removed:', removedTab);
  return { message: 'Tab removed successfully' };
};

// Function to add a tab to favorites
export const addToFavorites = (tabId) => {
  const tab = tabs.find(t => t.id === tabId);
  if (!tab) {
    throw new Error('Tab not found');
  }
  if (userFavorites.some(fav => fav.id === tab.id)) {
    throw new Error('Tab is already in favorites');
  }
  userFavorites.push(tab);
  saveData('userFavorites', userFavorites);
  
  // Reload from localStorage to ensure update
  userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
  console.log('Tab added to favorites:', tab);
  return { message: 'Tab added to favorites', favorites: userFavorites };
};


// Function to remove a tab from favorites
export const removeFromFavorites = (tabId) => {
  userFavorites = userFavorites.filter(fav => fav.id !== tabId);
  saveData('userFavorites', userFavorites);

  // Reload from localStorage to ensure update
  userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || [];
  console.log('Tab removed from favorites:', tabId);
  return { message: 'Tab removed from favorites', favorites: userFavorites };
};


// Function to fetch all favorites
export const getAllFavorites = () => {
  return userFavorites;
};

// Function to update user profile
export const updateUserProfile = (first_name, last_name, job_position, address, department, primary_email, secondary_email) => {
  if (!first_name || !last_name || !primary_email) {
    throw new Error('First name, last name, and primary email are required');
  }
  const updatedProfile = { first_name, last_name, job_position, address, department, primary_email, secondary_email };
  saveData('userProfile', updatedProfile); // Save to localStorage
  console.log('User profile updated:', updatedProfile);
  return { message: 'User profile updated successfully', updatedProfile };
};

// Function to change password
export const changePassword = (old_password, new_password) => {
  if (!old_password || !new_password) {
    throw new Error('Old password and new password are required');
  }
  console.log('Password change request:', { old_password, new_password });
  return { success: true, message: 'Password changed successfully' };
};