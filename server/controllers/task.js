const Task = require("../models/Task");

const postTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const task = await Task.create({
      title,
      description: "",
      card: id,
    });

    res.status(200).json(task);
  } catch (error) {
    throw error;
  }
};

const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    res.status(200).json(task);
  } catch (error) {
    throw error;
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}, { description: 0 });

    res.status(200).json(tasks);
  } catch (error) {
    throw error;
  }
};

const editTask = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;

  const filter = id;
  const update = { title, description };

  const changedTask = await Task.findByIdAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json(changedTask);
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

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
