const Task = require("../models/Task");
const Comment = require("../models/Comment");

const postTask = async (req, res) => {
  try {
    const { cardId, boardId } = req.params;
    const { title } = req.body;

    const tasks = await Task.find({ card: { _id: cardId } });
    const position = tasks.length

    const task = await Task.create({
      title,
      description: "",
      card: cardId,
      board: boardId,
      position,
    });

    res.status(200).json(task);
  } catch (error) {
    throw error;
  }
};

const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    const comments = await (await Comment.find({task: taskId}).populate("author")).reverse()

    const taskData = {
      task, comments
    }

    res.status(200).json(taskData);
  } catch (error) {
    throw error;
  }
};

const getTasks = async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await Task.find(
      { board: { _id: boardId } },
      { description: 0 }
    );

    res.status(200).json(tasks);
  } catch (error) {
    throw error;
  }
};

const editTask = async (req, res) => {
  const { title, description } = req.body;
  const { taskId } = req.params;

  const filter = taskId;
  const update = { title, description };

  const changedTask = await Task.findByIdAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json(changedTask);
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    res.status(200).json(deletedTask);
  } catch (error) {
    throw error;
  }
};

const changeTaskOrder = async (req, res) => {
  const {taskId} = req.params
  const {newPosition, oldPosition, oldCardId, newCardId} = req.body;

  if (oldCardId === newCardId && newPosition - oldPosition === 0) {
    return
  }

  if(oldCardId === newCardId) {

    if (newPosition - oldPosition === 1 || newPosition - oldPosition === -1) {
      await Task.findOneAndUpdate({ "card": oldCardId, position: newPosition }, {position: oldPosition}, {
        new: true
      })
      const task = await Task.findByIdAndUpdate(taskId, {position: newPosition});
      
      res.status(200).json(task)
    }
  
    if( newPosition - oldPosition < -1 ) {
      await Task.updateMany({"card": oldCardId, position: {$gte: newPosition, $lt: oldPosition}}, {$inc: {position: 1}})
      const task = await Task.findByIdAndUpdate(taskId, {position: newPosition}, {
        new: true
      })
  
      res.status(200).json(task)
    }
  
    if( (newPosition - oldPosition) > 1 ) {
      await Task.updateMany({"card": oldCardId, position: {$gte: oldPosition, $lte: newPosition}}, {$inc: {position: -1}})
      const task = await Task.findByIdAndUpdate(taskId, {position: newPosition}, {
        new: true
      })
  
      res.status(200).json(task)
    }
  }
  if(oldCardId !== newCardId) {
    await Task.updateMany({"card": oldCardId, position: {$gt: oldPosition}}, {$inc: {position: -1}})
    await Task.updateMany({"card": newCardId, position: {$gte: newPosition}}, {$inc: {position: 1}})

    const task = await Task.findByIdAndUpdate(taskId, {position: newPosition, card: newCardId})
    res.status(200).json(task)
  }
}

exports.editTask = editTask;
exports.postTask = postTask;
exports.deleteTask = deleteTask;
exports.getTasks = getTasks;
exports.getTask = getTask;
exports.changeTaskOrder = changeTaskOrder;
