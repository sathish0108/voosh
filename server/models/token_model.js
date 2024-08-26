const mongoose = require("mongoose");
const { v4 } = require("uuid");

const TokenSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    empId: {
      type: String,
    },
    token:{
        type:String
    }
  },
  { timestamps: true }
);

const Token = mongoose.model('authtoken', TokenSchema)

module.exports = Token
