const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/database.sqlite",
});

const Todo = sequelize.define("Todo", {
  text: DataTypes.STRING,
  dificulty: DataTypes.STRING,
  complete: DataTypes.BOOLEAN,
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
