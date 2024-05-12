// src/controllers/resourceController.js

const Resource = require('../models/Resource');

const createResource = async (req, res, next) => {
  // Implementation for creating a new resource
  try {
    const { title, description, category, author } = req.body;
    const newResource = await Resource.create({ title, description, category, author });
    res.status(201).json({ message: 'Resource created successfully', resource: newResource });
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllResources = async (req, res, next) => {
  // Implementation for retrieving all resources
  try {
    const resources = await Resource.find();
    res.json({ resources });
  } catch (error) {
    console.error('Error getting all resources:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getResourceById = async (req, res, next) => {
  // Implementation for retrieving a resource by ID
  try {
    const { id } = req.params;
    const resource = await Resource.findById(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ resource });
  } catch (error) {
    console.error('Error getting resource by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateResource = async (req, res, next) => {
  // Implementation for updating a resource
  try {
    const { id } = req.params;
    const { title, description, category, author } = req.body;
    const updatedResource = await Resource.findByIdAndUpdate(id, { title, description, category, author }, { new: true });
    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ message: 'Resource updated successfully', resource: updatedResource });
  } catch (error) {
    console.error('Error updating resource:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteResource = async (req, res, next) => {
  // Implementation for deleting a resource
  try {
    const { id } = req.params;
    const deletedResource = await Resource.findByIdAndDelete(id);
    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource
};
