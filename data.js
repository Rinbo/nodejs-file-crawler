const fs = require("fs");
const path = require("path");

const lib = {};

lib.baseDir = path.join(__dirname, "./"); // Root folder for this project
lib.searchDir = path.join(__dirname, "../");  // The folder where searching begins

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

lib.read = function(dir, file, callback) {
  fs.readFile(
    `${lib.searchDir}/${dir == null ? "" : dir + "/"}${file}`,
    "utf8",
    function(err, data) {
      if (!err && data) {        
        callback(false, data);
      } else callback(err, data);
    }
  );
};

lib.update = function(dir, file, data, callback) {  
  fs.open(`${lib.baseDir}/${dir}/${file}.txt`, "a+", function(
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
              callback("Error closing the file");
            }
          });
        } else {
          callback("Could not write to file");
        }
      });
    } else {
      callback("Could not open the file for updating, it may not exist");
    }
  });
};

lib.listDirectoryContent = function(dir, callback) {
  fs.readdir(
    `${lib.searchDir}/${dir == null ? "" : dir + "/"}`,
    { encoding: "utf8", withFileTypes: true },
    function(err, data) {
      if (!err && data && data.length > 0) {
        const content = [];
        data.forEach(element => {
          if (
            element != "" &&
            element.name != ".git" &&
            element.name != ".gitignore" &&
            element.name != "node_modules" &&
            element.name != "bundle.js"
          )
            content.push(element);
        });
        callback(false, content);
      } else {
        callback(err, data);
      }
    }
  );
};

module.exports = lib;
