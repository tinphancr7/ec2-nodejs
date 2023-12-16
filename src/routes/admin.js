const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/manage-user', adminController.getAllUsers);
router.get('/manage-product', adminController.getAllProduct);
router.post('/manage-user/new', adminController.createUser);
router.delete('/manage-user/:id', adminController.deleteUser);
router.put('/manage-user/:id', adminController.updateUser);
router.get('/manage-user/:id', adminController.getUserById);
router.get('/manage-post', adminController.getAllPost);
router.get('/manage-post/:id', adminController.getPostById);

module.exports = router;
