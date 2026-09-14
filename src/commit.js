// commit.js
import "./reset.css";
import "./styles.css";
import AppHandler from "./handlers/appHandler.js";
import { deleteType, formMode } from "./data/constants.js";


const sidebarToggle = document.querySelector( ".sidebar-toggle-button" );
const sidebar  = document.querySelector( ".sidebar" );
const todayDate = document.querySelector("#today-date");
const viewNameUIs = document.querySelectorAll(".view-name");
const viewDescUI = document.querySelector("#view-desc");
const totalTasks = document.querySelectorAll(".total");
const wsModalOpenButtons = document.querySelectorAll(".open-workspaceModal");
const workspaceButtons = document.querySelectorAll(".workspace-buttons button")
const deleteWorkspaceButton = document.querySelector("#delete-workspace");
const deleteModal = document.querySelector("#delete-modal");
const workspaceModal = document.querySelector("#workspace-modal");
const smartViewList  = document.querySelector("#smartview-list");
const workspaceList  = document.querySelector("#workspace-list");
const taskModalOpenButtons = document.querySelectorAll(".open-taskModal")
const taskModal = document.querySelector("#task-modal");
const taskList = document.querySelector("#task-list");
const taskPrompts = document.querySelector(".task-prompts");
const tasksContainer = document.querySelector(".task-container");
const closeModalButtons = document.querySelectorAll(".close-modal");
const completeCount = document.querySelector("#complete-count");

const app = AppHandler({
    smartViewList,
    workspaceList,
    viewNameUIs,
    viewDescUI,
    workspaceButtons,
    workspaceModal,
    taskModal,
    taskList,
    taskPrompts,
    tasksContainer,
    todayDate,
    totalTasks,
    completeCount,
    deleteModal,
});

//toggling logic for sidebar
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapse");
});

//closing all modals
closeModalButtons.forEach((button) => {
    button.addEventListener("click", app.closModal)
})

//closing workspace related modals
wsModalOpenButtons.forEach((button) => {
    switch (button.id) {
        case "add-workspace":
            button.dataset.formMode = formMode.new;
            break;
        case "edit-workspace":
            button.dataset.formMode = formMode.edit;
            break;
    }
    button.addEventListener("click", app.openWorkspaceModal);
});
   

taskModalOpenButtons.forEach((button) => {
    button.dataset.formMode = formMode.new;
    button.addEventListener("click", app.openTaskModal);
})

deleteWorkspaceButton.dataset.deleteType = deleteType.WORKSPACE;
deleteWorkspaceButton.addEventListener("click", app.openDeleteModal)