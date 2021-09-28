const Task = require('../models/Task');
const Card = require('../models/Card');
const TaskDescription = require('../models/TaskDescription');

const getDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("description");
    res.status(200).json(task.description);
  } catch (error) {
    throw error;
  }
};

const addDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, cardId } = req.body;

    const taskDescription = await TaskDescription.create({
      description,
    });
    await taskDescription.save();

    const task = await Task.findById(id);
    const card = await Card.findById(cardId);

    task.description.push(taskDescription);
    card.taskDescriptions.push(taskDescription);
    await card.save();
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    throw error;
  }
}

const changeDescription = async (req, res) => {
  const { description } = req.body;
  const {id} = req.params;

  const filter =  id;
  const update = { description };

  const changedDescription = await TaskDescription.findByIdAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json(changedDescription);
};

exports.getDescription = getDescription;
exports.changeDescription = changeDescription;
exports.addDescription = addDescription;