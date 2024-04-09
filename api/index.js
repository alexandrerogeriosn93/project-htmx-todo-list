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

    let html = tasks
      .map(
        (task) =>
          `<div class="card mb-3 ${
            task.completa ? "bg-light border-success" : ""
          }">
        <div class="card-body ${task.complete ? "font-italic" : ""}">
            <h5 class="card-title">task: ${task.text}</h5>
            <p class="card-text">Dificuldade: ${task.dificulty}</p>
            <p class="card-text">Status: ${
              task.complete ? "Completa" : "Incompleta"
            }</p>
            <button class="btn btn-primary" onclick="editTask(${task.id}, '${
            task.text
          }', '${task.dificulty}')">Editar</button>
            <button class="btn btn-danger" onclick="deleteTask(${
              task.id
            })">Deletar</button>
            <button class="btn btn-secondary" onclick="toggleTask(${
              task.id
            })">${task.complete ? "Desmarcar" : "Marcar"} como Completa</button>
        </div>
    </div>`
      )
      .join("");

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
