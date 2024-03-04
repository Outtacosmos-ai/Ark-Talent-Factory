const mongoose = require("mongoose");
const express = require("express");
const app = express();

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

mongoose
  .connect("mongodb://localhost:27017/BlogApp")
  .then(() => {
    console.log("Connection open!");
  })
  .catch((err) => {
    console.log("Connection failed!");
    console.log(err);
  });


app.use(express.json());

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
