import fs from "fs";
import path from "path";

const lib = {};

lib.baseDir = path.join(__dirname, "./data");

// Write data to file
lib.create = function(dir, file, data, callback) {
  fs.open(`${lib.baseDir}/${dir}/${file}.text`, "wx", function(
    err,
    fileDesciptor
  ) {
    if (!err && fileDesciptor) {
      fs.writeFile(fileDesciptor, data, function(err) {
        if (!err) {
          fs.close(fileDesciptor, function(err) {
            if (!err) {
              callback(false);
            } else {
              callback("Could not close the file");
            }
          });
        } else {
          callback("Error writing to file");
        }
      });
    } else {
      callback("Could not create a new file. Might it already exist?");
    }
  });
};
