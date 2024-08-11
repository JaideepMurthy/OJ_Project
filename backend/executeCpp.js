const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

const outputPath = path.join(__dirname, 'outputs'); // C:\Users\Murthy\Desktop\Jaideep Folder\Algo Uni\UOC\backend\outputs

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filepath) => {
  // C:\Users\Murthy\Desktop\Jaideep Folder\Algo Uni\UOC\backend\codes\3a5c64a5-1ca0-4b0d-b7ed-9ad158eb8b53.cpp
  const jobId = path.basename(filepath).split(".")[0]; //3a5c64a5-1ca0-4b0d-b7ed-9ad158eb8b53
  const output_filename = `${jobId}.exe`; //3a5c64a5-1ca0-4b0d-b7ed-9ad158eb8b53.exe
  const outPath = path.join(outputPath, output_filename); // C:\Users\Murthy\Desktop\Jaideep Folder\Algo Uni\UOC\backend\outputs\3a5c64a5-1ca0-4b0d-b7ed-9ad158eb8b53.exe

  return new Promise((resolve, reject) => {
    exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${output_filename}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error}`)
          reject({ error, stderr });
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`)

          reject(stderr);
        }
        console.log(`stdout: ${stdout}`)
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executeCpp,
};
