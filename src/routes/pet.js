const express = require('express');
const router = express.Router();

const petController = require('../controllers/petController');

router.post('/new', petController.createPet);
router.get('/:id', petController.getPetbyId);
router.get('/', petController.getAllPets);
router.get('/user/:id', petController.getAllPetsByUserId);
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);

module.exports = router;
