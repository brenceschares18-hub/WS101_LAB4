const API_URL = "http://localhost:8080/api/todos";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// ✅ Fetch all todos from backend
function fetchTodos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      todoList.innerHTML = ""; // clear existing list
      data.forEach(todo => {
        const li = document.createElement("li");
        li.textContent = todo.title;

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTodo(todo);

        // Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteTodo(todo.id);

        li.appendChild(editBtn);
        li.appendChild(delBtn);
        todoList.appendChild(li);
      });
    });
}

// ✅ Add new todo
todoForm.addEventListener("submit", e => {
  e.preventDefault();
  const newTodo = { title: todoInput.value };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo)
  })
  .then(res => res.json())
  .then(() => {
    todoInput.value = "";
    fetchTodos();
  });
});

// ✅ Delete todo
function deleteTodo(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => fetchTodos());
}

// ✅ Edit todo
function editTodo(todo) {
  const newTitle = prompt("Edit todo:", todo.title);
  if (!newTitle) return;

  fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle })
  })
  .then(() => fetchTodos());
}

// Initial fetch
fetchTodos();
