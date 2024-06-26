document.body.addEventListener("htmx:afterRequest", function (event) {
  if (event.target.getAttribute("id") === "edit-form") {
    cancelEdit();
    updateTaskList();
  }

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

function editTask(id, text, dificulty) {
  document.querySelector("#edit-id").value = id;
  document.querySelector("#edit-text").value = text;
  document.querySelector("#edit-dificulty").value = dificulty;
  document.querySelector("#edit-form").classList.remove("d-none");
  document.querySelector("#todo-form").classList.add("d-none");
}

function cancelEdit() {
  document.querySelector("#edit-form").classList.add("d-none");
  document.querySelector("#todo-form").classList.remove("d-none");
}
