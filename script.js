const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');


let todos = JSON.parse(localStorage.getItem('todos')) || [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false }
];

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
  const text = prompt('Введіть нове завдання:');
  if (text) {
    const newTodo = {
      id: Date.now(),
      text,
      checked: false
    };
    todos.push(newTodo);
    render();
    updateCounter();
    saveTodos();
  }
}

function renderTodo(todo) {
  const li = document.createElement('li');
  li.className = 'list-group-item';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'form-check-input me-2';
  checkbox.id = todo.id;
  checkbox.checked = todo.checked;
  checkbox.addEventListener('change', () => checkTodo(todo.id));

  const label = document.createElement('label');
  label.htmlFor = todo.id;
  label.innerHTML = <span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.text}</span>;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-danger btn-sm float-end';
  deleteButton.textContent = 'delete';
  deleteButton.addEventListener('click', () => deleteTodo(todo.id));

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteButton);

  return li;
}

function render() {
  list.innerHTML = '';
  todos.forEach(todo => list.appendChild(renderTodo(todo)));
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
  updateCounter();
  saveTodos();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    render();
    updateCounter();
    saveTodos();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render();
  updateCounter();
});
