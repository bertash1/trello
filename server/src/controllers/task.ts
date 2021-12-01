import Task from "../models/Task"
import Comment from "../models/Comment"
import { ITask } from "../types/types"
import { Request, Response } from "express"

export const postTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const cardId: string = req.params.cardId
    const boardId: string = req.params.boardId
    const { title }: { title: string } = req.body

    const tasks: Array<ITask> = await Task.find({ card: cardId })
    const position: number = tasks.length

    const task: ITask = await Task.create({
      title,
      description: "",
      card: cardId,
      board: boardId,
      position,
    })

    res.status(200).json(task)
  } catch (error) {
    throw error
  }
}

export const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const taskId: string = req.params.taskId

    const task = await Task.findById(taskId)
    const comments = await (
      await Comment.find({ task: taskId }).populate("author")
    ).reverse()

    const taskData = {
      task,
      comments,
    }

    res.status(200).json(taskData)
  } catch (error) {
    throw error
  }
}

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const boardId: string = req.params.boardId
    const tasks = await Task.find({ board: boardId }, { description: 0 })

    res.status(200).json(tasks)
  } catch (error) {
    throw error
  }
}

export const editTask = async (req: Request, res: Response): Promise<void> => {
  const { title, description }: { title: string; description: string } =
    req.body
  const taskId: string = req.params.taskId

  const changedTask = await Task.findByIdAndUpdate(
    taskId,
    { title, description },
    {
      new: true,
    }
  )

  res.status(200).json(changedTask)
}

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const taskId: string = req.params.taskId

    const deletedTask = await Task.findByIdAndDelete(taskId)

    res.status(200).json(deletedTask)
  } catch (error) {
    throw error
  }
}

export const changeTaskOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const taskId: string = req.params.taskId
  const {
    newPosition,
    oldPosition,
    oldCardId,
    newCardId,
  }: {
    newPosition: number
    oldPosition: number
    oldCardId: string
    newCardId: string
  } = req.body

  if (oldCardId === newCardId && newPosition - oldPosition === 0) {
    return
  }

  if (oldCardId === newCardId) {
    if (newPosition - oldPosition === 1 || newPosition - oldPosition === -1) {
      await Task.findOneAndUpdate(
        { card: oldCardId, position: newPosition },
        { position: oldPosition },
        {
          new: true,
        }
      )
      const task = await Task.findByIdAndUpdate(taskId, {
        position: newPosition,
      })

      res.status(200).json(task)
    }

    if (newPosition - oldPosition < -1) {
      await Task.updateMany(
        { card: oldCardId, position: { $gte: newPosition, $lt: oldPosition } },
        { $inc: { position: 1 } }
      )
      const task = await Task.findByIdAndUpdate(
        taskId,
        { position: newPosition },
        {
          new: true,
        }
      )

      res.status(200).json(task)
    }

    if (newPosition - oldPosition > 1) {
      await Task.updateMany(
        { card: oldCardId, position: { $gte: oldPosition, $lte: newPosition } },
        { $inc: { position: -1 } }
      )
      const task = await Task.findByIdAndUpdate(
        taskId,
        { position: newPosition },
        {
          new: true,
        }
      )

      res.status(200).json(task)
    }
  }
  if (oldCardId !== newCardId) {
    await Task.updateMany(
      { card: oldCardId, position: { $gt: oldPosition } },
      { $inc: { position: -1 } }
    )
    await Task.updateMany(
      { card: newCardId, position: { $gte: newPosition } },
      { $inc: { position: 1 } }
    )

    const task = await Task.findByIdAndUpdate(taskId, {
      position: newPosition,
      card: newCardId,
    })
    res.status(200).json(task)
  }
}
