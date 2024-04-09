document.body.addEventListener("htmx:afterRequest", function (event) {
  if (event.target.getAttribute("id") === "todo-form") {
    resetForm();
    updateTaskList();
  }
});

function resetForm() {
  document.querySelector("#todo-form").reset();
}

function updateTaskList() {
  htmx.ajax("GET", "http://localhost:3000/todos", "#todo-list");
}

function deleteTask(id) {
  if (confirm("Tem certeza que deseja excluir a tarefa?")) {
    htmx.ajax("DELETE", `http://localhost:3000/todos/${id}`, "#msg");
    updateTaskList();
  }
}

function toggleTask(id) {
  htmx.ajax("PATCH", `http://localhost:3000/todos/${id}`, "#msg");
  updateTaskList();
}
