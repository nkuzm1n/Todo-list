const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('#filter-todo')

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)


function addTodo(event) {
    event.preventDefault()

    if (todoInput.value !== '') {
        const todoItem = document.createElement('li')
        todoItem.classList.add('todo')

        const newTodo = document.createElement('div')
        newTodo.innerText = todoInput.value
        newTodo.classList.add('todo-item')
        todoItem.appendChild(newTodo)

        saveLocalTodos(todoInput.value)

        const completedButton = createTodoButton('<i class="fas fa-check"></i>', 'complete-btn', todoItem)
        const trashButton = createTodoButton('<i class="fas fa-trash"></i>', 'trash-btn', todoItem)

        todoList.appendChild(todoItem)
        todoInput.value = ''
    }
}

function createElemNClass(elem = 'div', elemClass = '') {
    const el = document.createElement(elem)
    el.classList.add(elemClass)
    return el
}

function createTodoButton(btnIcon = '', btnClass = '', parent) {
    const btn = createElemNClass('button', btnClass)
    btn.innerHTML = btnIcon
    parent.appendChild(btn)
    return btn
}

function deleteCheck(event) {
    const item = event.target
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement
        todo.classList.add('slide')
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', () => {
            todo.classList.remove('slide')
            todo.remove()
        })
    } else if (item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle('completed')
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes
    todos.forEach(todo => {
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            default:
                break
        }
    })
}

function saveLocalTodos(todo) {
    let todos = checkLocalStorageTodos()
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    const todos = checkLocalStorageTodos()
    todos.forEach(todo => {
        const todoItem = document.createElement('li')
        todoItem.classList.add('todo')

        const newTodo = document.createElement('div')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoItem.appendChild(newTodo)

        const completedButton = createTodoButton('<i class="fas fa-check"></i>', 'complete-btn', todoItem)
        const trashButton = createTodoButton('<i class="fas fa-trash"></i>', 'trash-btn', todoItem)

        todoList.appendChild(todoItem)
    })
}

function checkLocalStorageTodos() {
    const localTodos = localStorage.getItem('todos')
    let todos
    if (localTodos === null) {
        todos = []
    } else {
        todos = JSON.parse(localTodos)
    }
    return todos
}

function removeLocalTodos(todo) {
    let todos = checkLocalStorageTodos()
    const todoDescr = todo.querySelector('.todo-item').innerText
    const todoIndex = todos.indexOf(todoDescr)
    todos.splice(todoIndex, 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}