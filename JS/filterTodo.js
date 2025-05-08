//HÄMTAR TODOS (Samma kod som används i fetchTodo)
async function loadTodos(userId) {
  const todoList = document.querySelector(".todo-container .todo-list");

  todoList.innerHTML = "";

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
    );
    allTodos = await response.json();
    renderTodos(allTodos);
  } catch (error) {
    console.error("Fel vid hämtning av todos:", error);
    todoList.innerHTML = "<li>Kunde inte ladda todos.</li>";
  }
}

//RENDERAR (Slagit ihop kod med resterande av fetchTodo)
function renderTodos(todos) {
  
  const list = document.querySelector(".todo-container .todo-list");
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.setAttribute('data-completed', todo.completed);

    const img = document.createElement('img');
    img.src = todo.completed ? './images/checkedbox.svg' : './images/uncheckedbox.svg';
    img.alt = todo.completed ? 'Slutförd' : 'Ej slutförd';
    img.style.width = '20px';
    img.style.marginRight = '8px';

    const span = document.createElement('span');
    span.textContent = todo.title;

    li.appendChild(img);
    li.appendChild(span);

    if (todo.completed) {
      li.classList.add('completed');
    }

    list.appendChild(li);
  });
}

// FILTER-FUNKTION
function filterTodos(filter) {

  let filtered;

  if (filter === 'completed') {
    filtered = allTodos.filter(todo => todo.completed);
  } else if (filter === 'incomplete') {
    filtered = allTodos.filter(todo => !todo.completed);
  } else {
    filtered = allTodos;
  }

  renderTodos(filtered);
}

// DROPDOWN
document.addEventListener('DOMContentLoaded', () => {

  const filterIcon = document.querySelector('.todo-filter');
  const filterMenu = document.querySelector('.filter-menu');

  filterIcon.addEventListener('click', () => {
    filterMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.filter-container')) {
      filterMenu.classList.add('hidden');
    }
  });

  loadTodos();
});
