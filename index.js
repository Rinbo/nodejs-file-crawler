const fileSystem = require("./data");

const FILE_EXTENTION = FILE_EXTENTION;

// Begin reading from directory one step above project root
fileSystem.listDirectoryContent(null, (err, dirContentL1) => {
  if (!err) {
    // Take the directory contents and loop through it to see if it contains folders or files
    dirContentL1.forEach(elementL1 => {
      if (elementL1.isFile()) {
        // Element is a file
        if (elementL1.name.match(FILE_EXTENTION)) {
          fileSystem.read(null, elementL1.name, (err, data) => {
            if (!err) {
              appendToOutputFile(data);
            } else {
              console.log(err, "unable to read from file [level 1]");
            }
          });
        }
      } else {
        // Element is a folder
        fileSystem.listDirectoryContent(elementL1.name, (err, dirContentL2) => {
          if (!err) {
            dirContentL2.forEach(elementL2 => {
              if (elementL2.isFile()) {
                if (elementL2.name.match(FILE_EXTENTION)) {
                  fileSystem.read(
                    elementL1.name,
                    elementL2.name,
                    (err, data) => {
                      if (!err) {
                        appendToOutputFile(data);
                      } else {
                        console.log(err, "unable to read from file [level 1]");
                      }
                    }
                  );
                }
              } else {
                fileSystem.listDirectoryContent(
                  elementL1.name + "/" + elementL2.name,
                  (err, dirContentL3) => {
                    if (!err) {
                      dirContentL3.forEach(elementL3 => {
                        if (elementL3.isFile()) {
                          if (elementL3.name.match(FILE_EXTENTION)) {
                            fileSystem.read(
                              elementL1.name + "/" + elementL2.name,
                              elementL3.name,
                              (err, data) => {
                                if (!err) {
                                  appendToOutputFile(data);
                                } else {
                                  console.log(
                                    err,
                                    "unable to read from file [level 1]"
                                  );
                                }
                              }
                            );
                          }
                        } else {
                          console.log("Maximum depth level reached");
                        }
                      });
                    } else {
                      console.log(
                        err,
                        "Unable to read from directory [Level3]"
                      );
                    }
                  }
                );
              }
            });
          } else {
            console.log(err, "Unable to read from directory [level 2]");
          }
        });
      }
    });
  } else {
    console.log(err, "Unable to read from directory [level 1]");
  }
});

// Modify matchers to suit your criteria
const appendToOutputFile = data => {
  data.split("\n").forEach(line => {
    line = line.trim();
    if (
      line.length > 20 &&
      line.length < 60 &&
      line.match(/([/(){}[\]])/) &&
      !line.match("http") &&
      !line.match("//") &&
      !line.match("Robin") &&
      !line.match("Börjesson") &&
      !line.match("rinbo") &&
      !line.match("sha1")
    ) {
      fileSystem.update("data", "output", line + "\n", err => {
        if (!err) {
          console.log("Success");
        } else {
          console.log(err, "Bummer!");
        }
      });
    }
  });
};
