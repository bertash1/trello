const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const {
  addCard,
  getCards,
  deleteCard,
  editCard,
} = require('../controllers/card');


router.get('/:id', authMiddleware, getCards);
router.post('/:id', authMiddleware, addCard);
router.patch('/:id', authMiddleware, editCard);
router.delete('/:id/:userId', authMiddleware, deleteCard);

module.exports = router;
