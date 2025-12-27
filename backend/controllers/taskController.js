const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    status: req.body.status,
    user: req.user.id,
  });
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const { search = "", status, page = 1, limit = 5 } = req.query;

  const query = {
    user: req.user.id,
    title: { $regex: search, $options: "i" },
  };

  if (status) query.status = status;

  const tasks = await Task.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(query);

  res.json({ tasks, total });
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
