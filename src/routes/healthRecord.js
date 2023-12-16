const express = require('express');
const router = express.Router();

const healthController = require('../controllers/healthRecordController');

router.post('/new', healthController.createHealth);
router.put('/:id', healthController.updateHealth);
router.get('/', healthController.getHealth);
router.delete('/:id', healthController.deleteHealth);
router.get('/:id', healthController.getHealthById);

module.exports = router;
