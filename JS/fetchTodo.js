async function loadTodos(userId) {
  const todoContainer = document.querySelector(".todo-container");
  const todoList = todoContainer.querySelector(".todo-list");

  todoList.innerHTML = "";

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
    );
    const todos = await response.json();
    todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      const checkbox = document.createElement("img");
      checkbox.src = todo.completed
        ? "./images/checkedbox.svg"
        : "./images/uncheckedbox.svg";
      checkbox.alt = todo.completed ? "Checked" : "Unchecked";

      todoItem.appendChild(checkbox);
      todoItem.appendChild(document.createTextNode(todo.title));

      todoList.appendChild(todoItem);
    });
  } catch (error) {
    console.error("Fel vid hämtning av todos:", error);
    todoList.innerHTML = "<li>Kunde inte ladda todos.</li>";
  }
}