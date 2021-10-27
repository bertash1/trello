const Task = require("../models/Task");

const postTask = async (req, res) => {
  try {
    const { cardId, boardId } = req.params;
    const { title } = req.body;

    const task = await Task.create({
      title,
      description: "",
      card: cardId,
      board: boardId,
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

    res.status(200).json(task);
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

exports.editTask = editTask;
exports.postTask = postTask;
exports.deleteTask = deleteTask;
exports.getTasks = getTasks;
exports.getTask = getTask;
