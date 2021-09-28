const Card = require("../models/Card");

const addCard = async (req, res) => {
  try {
    const { title } = req.body;
    const card = await Card.create({ title });
    res.status(200).json(card);
  } catch (err) {
    throw err;
  }
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find().populate("tasks")
    res.status(200).json(cards);
  } catch (error) {
    throw error;
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;
  const deletedCard = await Card.findById(id);
  const deletedTasks = await deletedCard.populate("tasks");
  const deletedDescription = await deletedCard.populate("taskDescriptions");

  for (let item of deletedDescription.taskDescriptions) {
    await item.remove();
  }

  for (let item of deletedTasks.tasks) {
    await item.remove();
  }
  deletedCard.remove();
  res.status(200).json(deletedCard);
};

const editCard = async (req, res) => {
  const { title } = req.body;
  const {id} = req.params;

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
