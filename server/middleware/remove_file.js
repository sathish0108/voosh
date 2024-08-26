const fs = require("fs");

const file_system = async (files) => {
  fs.unlink(files, function (err) {
    if (err == null) {
    //   next();
    }
  });
};

module.exports = { file_system };
