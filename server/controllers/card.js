const Card = require("../models/Card");
const Task = require("../models/Task");

const postCard = async (req, res) => {
  try {
    const { title } = req.body;
    const { boardId } = req.params;

    const card = await Card.create({ title, board: boardId });

    res.status(200).json(card);
  } catch (err) {
    throw err;
  }
};

const getCards = async (req, res) => {
  try {
    const { boardId } = req.params;

    const cards = await Card.find({ board: { _id: boardId } }).populate({
      path: "board",
      match: { _id: boardId },
      select: "_id",
    });

    res.status(200).json(cards);
  } catch (error) {
    throw error;
  }
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  await Task.deleteMany({ card: { _id: cardId } });
  const card = await Card.findByIdAndDelete(cardId);

  res.status(200).json(card);
};

const editCard = async (req, res) => {
  const { title } = req.body;
  const { cardId } = req.params;

  const filter = cardId;
  const update = { title };

  const changedCard = await Card.findByIdAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json(changedCard);
};

exports.editCard = editCard;
exports.deleteCard = deleteCard;
exports.getCards = getCards;
exports.postCard = postCard;
