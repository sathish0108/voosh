const mongoose = require("mongoose");
const { v4 } = require("uuid");

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    user: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const tasks = mongoose.model("tasks", taskSchema);
module.exports = tasks;
