const Initiative = require('../models/Initiative');

const createInitiative = async (req, res, next) => {
  try {
    const { title, description, organizer, location, date } = req.body;
    const newInitiative = await Initiative.create({ title, description, organizer, location, date });
    res.status(201).json({ message: 'Initiative created successfully', initiative: newInitiative });
  } catch (error) {
    console.error('Error creating initiative:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllInitiatives = async (req, res, next) => {
    try {
      const initiatives = await Initiative.find();
      res.json({ initiatives });
    } catch (error) {
      console.error('Error getting all initiatives:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const getInitiativeById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const initiative = await Initiative.findById(id);
      if (!initiative) {
        return res.status(404).json({ message: 'Initiative not found' });
      }
      res.json({ initiative });
    } catch (error) {
      console.error('Error getting initiative by ID:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  const updateInitiative = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, location, date } = req.body;
      const updatedInitiative = await Initiative.findByIdAndUpdate(id, { title, description, location, date }, { new: true });
      if (!updatedInitiative) {
        return res.status(404).json({ message: 'Initiative not found' });
      }
      res.json({ message: 'Initiative updated successfully', initiative: updatedInitiative });
    } catch (error) {
      console.error('Error updating initiative:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  
const deleteInitiative = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedInitiative = await Initiative.findByIdAndDelete(id);
      if (!deletedInitiative) {
        return res.status(404).json({ message: 'Initiative not found' });
      }
      res.json({ message: 'Initiative deleted successfully' });
    } catch (error) {
      console.error('Error deleting initiative:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  module.exports = {
    createInitiative,
    getAllInitiatives,
    getInitiativeById,
    updateInitiative,
    deleteInitiative
  };