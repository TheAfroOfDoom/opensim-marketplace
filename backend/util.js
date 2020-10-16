// Function to find size of object in bytes
function roughSizeOfObject(object) {
  var objectList = [];
  var stack = [object];
  var bytes = 0;

  while (stack.length) {
    var value = stack.pop();

    if (typeof value === "boolean") {
      bytes += 4;
    } else if (typeof value === "string") {
      bytes += value.length * 2;
    } else if (typeof value === "number") {
      bytes += 8;
    } else if (typeof value === "object" && objectList.indexOf(value) === -1) {
      objectList.push(value);

      for (var i in value) {
        stack.push(value[i]);
      }
    }
  }
  return bytes;
}

// Function to find object based on firstName and lastName
function findUser(firstName, lastName, data) {
  return data.findIndex(function (a) {
    return firstName === a.FirstName && lastName === a.LastName;
  });
}

exports.sizeof = roughSizeOfObject;
exports.findUser = findUser;
