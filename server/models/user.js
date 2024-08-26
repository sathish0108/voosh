const mongoose = require("mongoose");
const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.isPasswordMatch = async (pwd) => {
  const user = this;
  return bcrypt.compare(pwd, user.password);
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
