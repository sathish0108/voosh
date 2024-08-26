const Tasks_Model = require("../models/tasks_model");
// Create new shades details
const tasks_register = async (req, res) => {
  const user = req.user;

  try {
    const { title, description } = req.body;
    let datas = {
      title: title,
      description: description,
      user: user,
    };
    let findByTitle = await Tasks_Model.findOne({ title: title });
    if (findByTitle) {
      return res.status(400).send({ message: "Title already exits" });
    } else {
      let register = await Tasks_Model.create(datas);
      if (!register) {
        return res.status(400).send({ message: "Task details not saved." });
      } else {
        return res.status(201).send({ message: "Task details has been saved." });
      }
    }
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

// Get all shades
const tasks_data = async (req, res) => {
  const user = req.user;
  console.log(user);

  let data = await Tasks_Model.aggregate([
    {
      $match: {
        user: user,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "email",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $addFields: {
        task_added_by: "$user.name",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        task_added_by: 1,
        createdAt: 1,
      },
    },
  ]);
  if (!data.length) {
    return res.status(400).send({ message: "tasks not found" });
  } else {
    return res.status(200).json(data);
  }
};

// Update shades with already exists
const tasks_update = async (req, res) => {
  const { id } = req.params;

  let currentData = await Tasks_Model.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!currentData) {
    return res.status(400).send({ message: "Invalid task details." });
  } else {
    return res.status(201).send({ message: "task details has been  updated." });
  }
};

// Delete particular shades
const tasks_delete = async (req, res) => {
  const { id } = req.params;

  let data = await Tasks_Model.findOne({ _id: id });
  let DeleteData;
  if (!data) {
    return res.status(400).send({ message: "Invalid task details" });
  } else {
    DeleteData = await Tasks_Model.deleteOne({ _id: id });
    return res.status(200).send({ message: "task details has been removed." });
  }
};

module.exports = { tasks_register, tasks_data, tasks_update, tasks_delete };
