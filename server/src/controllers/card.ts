import Card from "../models/Card";
import Task from "../models/Task";

import {Request, Response} from "express"
import { ICard } from "../types/types";

export const postCard = async (req:Request, res:Response): Promise<void> => {
  try {
    const title: string = req.body.title;
    const boardId: string = req.params.boardId;

    const cards: Array<ICard> = await Card.find({ board: boardId });
    const position: number = cards.length

    const card: ICard = await Card.create({ title, board: boardId, position });

    res.status(200).json(card);
  } catch (err) {
    throw err;
  }
};

export const getCards = async (req:Request, res:Response): Promise<void> => {
  try {
    const boardId: string = req.params.boardId;

    const cards: Array<ICard> = await Card.find({ board: boardId }).populate({
      path: "board",
      match: { _id: boardId },
      select: "_id",
    });

    res.status(200).json(cards);
  } catch (error) {
    throw error;
  }
};

export const deleteCard = async (req:Request, res:Response): Promise<void> => {
  const cardId: string = req.params.cardId;

  const card = await Card.findById(cardId)

  await Task.deleteMany({ card: cardId });
  await Card.updateMany({"board": card?.board, position: {$gt: card?.position}}, {$inc: {position: -1}})
  await card?.remove()

  res.status(200).json(card);
};

export const editCard = async (req:Request, res:Response): Promise<void> => {
  const title: string = req.body.title;
  const cardId: string = req.params.cardId;

  const changedCard = await Card.findByIdAndUpdate(cardId, { title }, {
    new: true,
  });

  res.status(200).json(changedCard);
};

export const changeOrder = async(req:Request, res:Response): Promise<void> => {
  const cardId: string = req.params.cardId;
  const {newPosition, oldPosition, boardId} : {newPosition: number; oldPosition: number; boardId: string} = req.body;

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
