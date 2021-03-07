const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

// set up express

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("Client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connected");
  }
);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// set up routes

app.use("/users", require("./routes/userRouter"));
app.use("/menus", require("./routes/menuRouter"));
app.use("/tables", require("./routes/tableRouter"));
app.use("/orders", require("./routes/orderRouter"));
app.use("/reports", require("./routes/reportRouter"));
app.use("/details", require("./routes/detailRouter"));
