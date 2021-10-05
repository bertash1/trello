const Card = require('../models/Card');
const User = require('../models/User');

const addCard = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    const card = await Card.create({ title });
    await card.save();

    const user = await User.findById(id);
    user.cards.push(card);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    throw err;
  }
};

const getCards = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const cards = [];

    for (const cardId of user.cards) {
      cards.push(
        await Card.findById(cardId).populate('tasks', { description: 0 })
      );
    }
    res.status(200).json(cards);
  } catch (error) {
    throw error;
  }
};

const deleteCard = async (req, res) => {
  const { id, userId } = req.params;

  const user = await User.findById(userId);
  user.cards.splice(user.cards.indexOf(id), 1);
  await user.save();
  const deletedCard = await Card.findById(id);
  const deletedTasks = await deletedCard.populate('tasks');

  for (let item of deletedTasks.tasks) {
    await item.remove();
  }
  deletedCard.remove();
  res.status(200).json(deletedCard);
};

const editCard = async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const filter = id;
  const update = { title };

  const changedCard = await Card.findByIdAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json(changedCard);
};

exports.editCard = editCard;
exports.deleteCard = deleteCard;
exports.getCards = getCards;
exports.addCard = addCard;
