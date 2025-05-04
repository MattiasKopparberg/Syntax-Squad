let allTodos = [];

fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(data => {
      allTodos = data.slice(0, 20);
      renderTodos(allTodos);
    })
    .catch(error => console.error('Fel vid hämtning:', error));

function renderTodos(todos) {
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.title;
    li.setAttribute('data-completed', todo.completed);
    if (todo.completed) {
      li.classList.add('completed');
    }
    list.appendChild(li);
  });
}

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
});
