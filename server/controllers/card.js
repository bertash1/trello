const Card = require("../models/Card");
const Task = require("../models/Task");

const postCard = async (req, res) => {
  try {
    const { title } = req.body;
    const { boardId } = req.params;

    const cards = await Card.find({ board: { _id: boardId } });
    const position = cards.length

    const card = await Card.create({ title, board: boardId, position });

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

const changeOrder = async(req, res) => {
  const {cardId} = req.params;
  const {newPosition, oldPosition, boardId} = req.body;

  if(newPosition - oldPosition === 0) {
    return
  }

  if (newPosition - oldPosition === 1 || newPosition - oldPosition === -1) {
    await Card.findOneAndUpdate({ "board": boardId, position: newPosition }, {position: oldPosition}, {
      new: true
    })
    const card = await Card.findByIdAndUpdate(cardId, {position: newPosition});
    
    res.status(200).json(card)
  }

  if( newPosition - oldPosition < -1 ) {
    await Card.updateMany({"board": boardId, position: {$gte: newPosition, $lt: oldPosition}}, {$inc: {position: 1}})
    const card = await Card.findByIdAndUpdate(cardId, {position: newPosition}, {
      new: true
    })

    res.status(200).json(card)
  }

  if( (newPosition - oldPosition) > 1 ) {
    await Card.updateMany({"board": boardId, position: {$gte: oldPosition, $lte: newPosition}}, {$inc: {position: -1}})
    const card = await Card.findByIdAndUpdate(cardId, {position: newPosition}, {
      new: true
    })

    res.status(200).json(card)
  }
}

exports.editCard = editCard;
exports.deleteCard = deleteCard;
exports.getCards = getCards;
exports.postCard = postCard;
exports.changeOrder = changeOrder;
