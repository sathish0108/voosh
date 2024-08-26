const jwt = require("jsonwebtoken");
// const TokenModel = require("../models/token_model");

const AuthVerify = async (req, res, next) => {
  const token = req.headers.auth;
  if (!token) {
    return res.status(400).send({
      message: "User must Be Logged In",
    });
  }
  try {
    // let findtoken = await TokenModel.find({ token: token });
    // if (!findtoken) {
    //   return res.status(401).send({ MESSAGE: "Unauthorized token" });
    // } else {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const tokendatetime = new Date(payload.time);

    let currenttime = Date();
    const assignDateTime = new Date(currenttime);

    let difference = assignDateTime - tokendatetime;
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    let session = hours + "." + minutes;

    if (session >= 24.0 || days >= 1) {
      // let DeleteToken;
      // DeleteToken = await TokenModel.deleteMany({ user: payload.user });
      return res.status(408).send({ MESSAGE: "Session timeout please login again." });
    } else {
      req.user = payload.user;
      next();
    }
    // }
  } catch (error) {
    return res.status(401).send({ MESSAGE: "Unauthorized token" });
  }
};

module.exports = AuthVerify;
