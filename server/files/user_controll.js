// const axios = require("axios");
const bcrypt = require("bcryptjs");
const User_Model = require("../models/user");
// const TokenModel = require("../models/token_model");
const { GenretAuthToken } = require("../service/Token.service");

// Create new User
const register = async (req, res) => {
  let salt = await bcrypt.genSalt(10);
  const { firstname, lastname, email, password } = req.body;
  let haspassword = await bcrypt.hash(password, salt);
  let findByUserName = await User_Model.findOne({ email: email });
  if (findByUserName) {
    return res.status(400).send({ message: "User Alreqdy Exit's" });
  } else {
    let datas = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: haspassword,
    };
    let creatins = await User_Model.create(datas);
    if (!creatins) {
      return res.status(400).send({ message: "User not created." });
    } else {
      return res.status(201).send({ message: "User has been created." });
    }
  }
};

// Admin and User login
const login = async (req, res) => {
  const { username, password } = req.body;
  let user = await User_Model.findOne({ email: username });
  if (!user) {
    return res.status(500).send({ message: "Invalid User" });
  } else {
    bcrypt.compare(password, user.password, async function (err, result) {
      if (err) {
        return res.status(400).send({ ERROR: err.message });
      } else if (result) {
        let Token = await GenretAuthToken(user);
        return res.status(200).send({
          SUCCESS: 1,
          TOKEN: Token,
        });
      } else {
        return res.status(400).send({
          SUCCESS: 0,
          MESSAGE: "Invalid Credential",
        });
      }
    });
  }
};

// Admin and User logout
const logout = async (req, res) => {
  // let token = await TokenModel.deleteMany({ empId: req.empId });
  // if (token)
  return res.status(200).send({ message: "Logout Successfully" });
};

module.exports = {
  register,
  login,
  logout,
};
