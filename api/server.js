const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

app.use(cors());

app.use(express.json({ extended: false }));

// define Routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
