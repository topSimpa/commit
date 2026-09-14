//taskListItem.js
import { priorityLevels, deleteType, formMode } from "../../data/constants.js";
import "./taskListItem.css";

export default function taskListItem({
    id,
    title,
    dueDate,
    workspace,
    priority,
    completed = false,
}) {
    const taskItem = document.createElement("li");
    const leftBottom = document.createElement("div");
    const textBox = document.createElement("div");
    const leftContent = document.createElement("div");
    const rightContent = document.createElement("div");
    const checkButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const titleBox = document.createElement("p");
    const dueDateBox = document.createElement("p");
    const workspaceBox = document.createElement("p");
    const viewButton = document.createElement("button");
    const calendarIcon = document.createElement("span");
    const checkIcon = document.createElement("span");
    const priorityIcon  = document.createElement("span");
    const deleteIcon  = document.createElement("span");
    const priorityBox = document.createElement("p");
    const viewIcon  = document.createElement("span");

    const ViewEvent = new CustomEvent("task:view", {
        bubbles: true,
        detail: {
            tid: id,
        }
    });
    const DeleteEvent = new CustomEvent("task:delete", {
        bubbles: true,
        detail: {
            type: deleteType.TASK,
            tid :id,
            title,
        }
    })

    taskItem.className = "task-item";
    taskItem.dataset.id = id;
    addPriorityClass(taskItem, priority);

    titleBox.textContent = title,
    titleBox.className = "task-title";

    calendarIcon.className = "material-symbols-outlined";
    calendarIcon.textContent = "\ue8df";
    dueDateBox.className = "task-dueDate";
    dueDateBox.append(calendarIcon, dueDate);

    workspaceBox.className = "task-workspace";
    workspaceBox.textContent = workspace;

    checkIcon.className = "material-symbols-outlined";
    checkIcon.textContent = "\uf0be";
    checkIcon.hidden = !completed;
    checkButton.className = "task-completed";

    if (completed) {
        checkButton.classList.add("checked");
        titleBox.classList.add("completed");
    }

    checkButton.addEventListener("click", () => {
        checkIcon.hidden = !checkIcon.hidden;
        checkButton.classList.toggle("checked");
        titleBox.classList.toggle("completed");
        taskItem.dispatchEvent( new CustomEvent("toggle:complete", {
            bubbles: true,
            detail: {
                tid: id,
                checked: !checkIcon.hidden,
            }
        }));
    })
    checkButton.append(checkIcon);

    priorityBox.className = "priority-box";
    addPriorityClass(priorityBox, priority);
    priorityIcon.className = "material-symbols-outlined";
    priorityIcon.textContent = "\uf0c6";
    priorityBox.append(priorityIcon, priority);


    leftContent.className = "left";
    textBox.className = "text-box";
    leftBottom.className = "left-bottom";
    leftBottom.append(dueDateBox, priorityBox, workspaceBox);
    textBox.append(titleBox, leftBottom);
    leftContent.append(checkButton, textBox);

    rightContent.className = "right";
    viewButton.className = "task-view";
    viewButton.dataset.formMode = formMode.edit;
    viewIcon.className = "material-symbols-outlined";
    viewIcon.textContent =  "\ue8f4";
    viewButton.append(viewIcon);
    viewButton.addEventListener("click", () => {
        taskItem.dispatchEvent(ViewEvent);
    })
 
    deleteButton.className = "task-delete";
    deleteIcon.className = "material-symbols-outlined";
    deleteIcon.textContent = "\ue92e";
    deleteButton.append(deleteIcon);
    deleteButton.addEventListener("click", () => {
        taskItem.dispatchEvent(DeleteEvent)
    })
    rightContent.append(viewButton, deleteButton)

    taskItem.append(leftContent, rightContent);
    
    return taskItem;
}

function addPriorityClass(element, priority) {
    switch(priority) {
        case (priorityLevels.LOW):
            element.classList.add("low");
            break;
        case (priorityLevels.MID):
            element.classList.add("mid");
            break;
        case (priorityLevels.HIGH):
            element.classList.add("high");
            break;
    }
}


