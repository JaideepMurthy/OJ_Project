const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

const dirCodes = path.join(__dirname, 'codes'); //C:\Users\Murthy\Desktop\Jaideep Folder\Algo Uni\UOC\backend\codes

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync (dirCodes, {recursive: true});   // The recursive: true option in the fs.mkdirSync method allows you to create a directory and all its parent directories if they don't already exist.
}

const generateFile = async (language, code) => {
  const jobId = uuid();
  const filename = `${jobId}.${language}`; //bd51619b-1fb8-4b29-9bd2-71415ddf9883
  const filePath = path.join(dirCodes, filename); // C:\Users\Murthy\Desktop\Jaideep Folder\Algo Uni\UOC\backend\codes\bd51619b-1fb8-4b29-9bd2-71415ddf9883.cpp
  fs.writeFileSync(filePath, code);
  return filePath;
};

module.exports = {
  generateFile,
};