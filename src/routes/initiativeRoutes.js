const express = require('express');
const router = express.Router();
const InitiativeController = require('../controllers/initiativeController');

// Define initiative routes
router.post('/', InitiativeController.createInitiative);
router.get('/', InitiativeController.getAllInitiatives);
router.get('/:id', InitiativeController.getInitiativeById);
router.put('/:id', InitiativeController.updateInitiative);
router.delete('/:id', InitiativeController.deleteInitiative);

module.exports = router;



