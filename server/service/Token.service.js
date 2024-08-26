const JWT = require("jsonwebtoken");
const TokenModel = require("../models/token_model");

const GenretAuthToken = async (data) => {
  const { email } = data;
  let loginIdandTime = {
    time: Date(),
    user: email,
  };
  let authToken = JWT.sign(loginIdandTime, process.env.JWT_SECRET_KEY);
  // let datas = { empId: _id, token: authToken };
  // let creationToken = await TokenModel.create(datas);
  return authToken;
};

module.exports = {
  GenretAuthToken,
};
