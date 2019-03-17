const fileSystem = require("./data");

// Begin reading from directory one step above project root
fileSystem.listDirectoryContent(null, (err, dirContentL1) => {
  if (!err) {
    // Take the directory contents and loop through it to see if it contains folders or files
    dirContentL1.forEach(elementL1 => {
      if (elementL1.isFile()) {
        // Element is a file
        if (elementL1.name.match(".html")) {
          fileSystem.read(null, elementL1.name, (err, data) => {
            if (!err) {
              // Loop through each line in file and append it to output file if the line fullfills certain criteria
              data.split("\n").forEach(line => {
                console.log(line)
                fileSystem.update("data", "output", line+"\n", err => {
                  if (!err) {
                    console.log("Success");
                  } else {
                    console.log(err, "Bummer!");
                  }
                });
              });
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
                // Element is a file
              } else {
                // Element is a folder
                fileSystem.listDirectoryContent(
                  elementL1.name + "/" + elementL2.name,
                  (err, dirContentL3) => {
                    if (!err) {
                      dirContentL3.forEach(elementL3 => {
                        if (elementL3.isFile()) {
                        } else {
                          //console.log("Maximum depth level reached")
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
