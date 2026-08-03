//displayTodoList.js
//module for displaying each todo
//todo: complete all handling function at the bottom
// todo: remember to add eventHandler for todo events

import "./todoList.css"
import todosController from "../../logic/todosController.js";
const priorities = todosController.getPriorityLevels();

const viewIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="26" class="todo-icons">
        <path d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39
        17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 
        20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
    </svg>`

const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="todo-icons">
        <title>delete-forever-outline</title >
        <path d="M14.12,10.47L12,12.59L9.87,10.47L8.46,11.88L10.59,14L8.47,16.12L9.88, 
        17.53L12,15.41L14.12,17.53L15.53,16.12L13.41,14L15.53,11.88L14.12,10.47M15.5, 
        4L14.5,3H9.5L8.5,4H5V6H19V4H15.5M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,
        19V7H6V19M8,9H16V19H8V9Z" />
    </svg>`


const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="todo-icons" width="24" height="24">
        <title>pencil</title>
        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9
         16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
    </svg>`


export default function displayTodoList(todoList) {
    const list =  document.createElement("ul");

    list.classList = "todo-list";

    for (const todo of todoList) {
        const item = document.createElement("li");
        item.classList = "todo-item";

        const display = displayTodo(todo);
        
        item.appendChild(display);
        list.appendChild(item);
    }

    return list
}

function displayTodo(todo) {
    const display = document.createElement("div");
    const completeCheck = document.createElement("input");
    const title = document.createElement("p");
    const viewButton = document.createElement("a");
    const editButton = document.createElement("a");
    const deleteButton = document.createElement("a");

    title.classList = "todo-title";
    title.textContent = todo.title;

    completeCheck.classList = "todo-complete";
    completeCheck.type = "checkbox";

    display.classList = "todo-display"

    if (todo.priority == priorities.HIGH ) {
        display.style.borderColor = "var(--high-color)";
        completeCheck.style.borderColor = "var(--high-color)";
    }  else if (todo.priority == priorities.MID) {
        display.style.borderColor = "var(--mid-color)";
        completeCheck.style.borderColor = "var(--mid-color)"
    } else if (todo.priority == priorities.LOW) {
        display.style.borderColor = "var(--low-color)";
        completeCheck.style.borderColor = "var(--low-color)"
    }

    if (todo.complete) {
        completeCheck.checked = true;
    }

    viewButton.innerHTML = viewIcon;
    editButton.innerHTML = editIcon;
    deleteButton.innerHTML = deleteIcon;

    display.append(
        completeCheck,
        title, 
        viewButton, 
        editButton,
        deleteButton,
    );
    return display
}


function markComplete() {

}

function deleteTodo() {

}

function viewTodo() {

}

function editTodo() {

}