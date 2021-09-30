const Card = require('../models/Card');
const Task = require('../models/Task');

const addTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const task = await Task.create({
      title,
      description: "",
    });
    await task.save();

    const cardById = await Card.findById(id);
    cardById.tasks.push(task);
    await cardById.save();
    res.status(200).json(cardById);
  } catch (error) {
    throw error;
  }
};

const fetchTask = async (req, res) => {
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
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    throw error;
  }
};

const editTask = async (req, res) => {
  const { title, description } = req.body;
  const {id} = req.params;

  const filter =  id;
  const update = { title, description };

  const changedTask = await Task.findByIdAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json(changedTask);
};

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const cardId = req.params.cardId;
    const deletedTask = await Task.findById(id);
    
    deletedTask.remove();
    const cardById = await Card.findById(cardId);
    cardById.tasks.splice(cardById.tasks.indexOf(id), 1);
    cardById.save();
    res.status(200).json({ deletedTask });
  } catch (error) {
    throw error;
  }
};

const replaceTask = async (req, res) => {
  try {
    const id = req.body._id;

    const prevCard = await Card.findById(req.params.prev);
    const curCard = await Card.findById(req.params.cur);

    prevCard.tasks.splice(prevCard.tasks.indexOf(id), 1);
    prevCard.save();
    curCard.tasks.push(id);
    curCard.save();

    res.status(200).json(curCard);
  } catch (err) {
    throw err;
  }
};

exports.editTask = editTask;
exports.addTask = addTask;
exports.deleteTask = deleteTask;
exports.getTasks = getTasks;
exports.replaceTask = replaceTask;
exports.fetchTask = fetchTask;
