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
