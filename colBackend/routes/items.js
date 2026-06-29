const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { protect } = require('../middlewares/authMiddleware');

// Apply authentication shield to all item routes
router.use(protect);

// Specific routes first to avoid conflict with /:id
router.get('/stats', itemController.getStats);

// Standard CRUD endpoints
router.get('/', itemController.getItems);
router.post('/', itemController.createItem);
router.get('/:id', itemController.getItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

module.exports = router;
