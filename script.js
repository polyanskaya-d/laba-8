
function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
}

function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function createTodo(text) {
  return {
    id: Date.now(),
    text: text,
    checked: false,
  };
}

function newTodo() {
  const text = prompt('Enter a new TODO:');
  if (text) {
    const todo = createTodo(text);
    todos.push(todo);
    render();
    updateCounter();
    saveTodos(todos);
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

  const span = document.createElement('span');
  span.className = todo.checked ? 'text-success text-decoration-line-through' : '';
  span.textContent = todo.text;

  label.appendChild(span);

  const button = document.createElement('button');
  button.className = 'btn btn-danger btn-sm float-end';
  button.textContent = 'delete';
  button.addEventListener('click', () => deleteTodo(todo.id));

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(button);

  return li;
}

function render() {
  list.innerHTML = '';
  todos.forEach(todo => {
    list.appendChild(renderTodo(todo));
  });
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  render();
  updateCounter();
  saveTodos(todos);
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    render();
    updateCounter();
    saveTodos(todos);
  }
}

let todos = loadTodos();

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

render();
updateCounter();
