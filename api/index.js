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

app.post("/todos", async (req, res) => {
  const { text, dificulty } = req.body;

  if (!text || !dificulty) {
    res.send(
      `<div class="alert alert-danger" role="alert">Texto e dificuldades são obrigatórios</div>`
    );
    return;
  }

  try {
    const newTask = await Todo.create({
      text,
      dificulty,
      complete: false,
    });

    res.send(
      `<div class="alert alert-success" role="alert">Tarefa ${newTask.text} criada com sucesso!</div>`
    );
  } catch (error) {
    res.send(
      `<div class="alert alert-danger" role="alert">Erro ao criar tarefa!</div>`
    );
  }
});

app.get("/todos", async (req, res) => {
  try {
    const tasks = await Todo.findAll();

    if (tasks.length === 0) {
      res.send("<p>Não há tarefas cadastradas!</p>");
      return;
    }

    let html = tasks.map((task) => `<p>${task.text}</p>`).join("");

    res.send(html);
  } catch (error) {
    res.send(
      `<div class="alert alert-danger" role="alert">Erro ao buscar tarefa!</div>`
    );
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
});
