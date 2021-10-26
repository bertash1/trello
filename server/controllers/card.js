const Card = require("../models/Card");
const Task = require("../models/Task");

//It will be changed in future: when we'll add Board model and oppotunity to add another users as board users.

const postCard = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;

    const card = await Card.create({ title, user: id });

    res.status(200).json(card);
  } catch (err) {
    throw err;
  }
};

const getCards = async (req, res) => {
  try {
    const { id } = req.params;

    const cards = await Card.find({ user: { _id: id } }).populate({
      path: "user",
      match: { _id: id },
      select: "_id",
    });

    res.status(200).json(cards);
  } catch (error) {
    throw error;
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;

  await Task.deleteMany({ card: { _id: id } });
  const card = await Card.findByIdAndDelete(id);

  res.status(200).json(card);
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
exports.postCard = postCard;
