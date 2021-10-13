const express = require('express');

const authMiddleware = require('../middlewares/auth-middleware');
const router = express.Router();

const {
  addCard,
  getCards,
  deleteCard,
  editCard,
} = require('../controllers/card');


router.get('/cards/:id', authMiddleware, getCards);
router.post('/card/:id', authMiddleware, addCard);
router.patch('/card/:id', authMiddleware, editCard);
router.delete('/card/:id/:userId', authMiddleware, deleteCard);

module.exports = router;
