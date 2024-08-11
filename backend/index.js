const express = require("express");
const cors = require("cors");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;
  
  if (code === undefined) {
    return res
      .status(500)
      .json({ success: false, message: "Empty code body!" });
  }

  try {
    const filePath = await generateFile(language, code);
    const output = await executeCpp(filePath);
    res.json({ filePath, output });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
