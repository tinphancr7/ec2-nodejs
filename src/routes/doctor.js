const express = require('express');
const router = express.Router();

const doctorController = require('../controllers/doctorController');

router.post('/new', doctorController.createDoctor);
router.get('/', doctorController.getDoctor);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;