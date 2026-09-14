//taskModalHandlers.js
import { defaultWorkspace, taskModalHeading, formMode } from "../data/constants.js";
import createTaskForm from "../ui-components/forms/taskForm.js";
import workspaceService from "../services/workspaceService.js";
import taskService from "../services/taskService.js";

export default function taskModalHandler(taskModal, onFormSubmission) {
     
    const openTaskModal = (event) => {
        const button = event.currentTarget;
        const taskForm  = taskModal.querySelector("#task-form");
        const title = taskModal.querySelector(".modal-title");
        const action = taskModal.querySelector(".modal-action");
        const customWorkspaces = workspaceService.getAllWorkspaces();
        const workspaceList =  [defaultWorkspace, ...customWorkspaces]
        const createForm =createTaskForm(workspaceList);
        let form;

        taskForm.innerHTML = "";
        
        switch (button.dataset.formMode) {
            case formMode.new: 
                title.textContent = taskModalHeading.new.modalTitle;
                action.textContent = taskModalHeading.new.modalAction;
                form = createForm.newTask();
                form.dataset.mode = formMode.new;
                break;
            case formMode.edit:
                const taskId = button.dataset.taskId //todo: make sure the task edit form button has this
                const taskData = taskService.getTask(taskId); 

                title.textContent = taskModalHeading.edit.modalTitle;
                action.textContent = taskModalHeading.edit.modalAction;
                form  = createForm.editTask(taskData);
                form.dataset.mode = formMode.edit;
                form.dataset.id = taskId;
                break;
        }
        taskForm.append(form)
        form.addEventListener("submit", taskFormSubmission);
        taskModal.showModal();
    }

    const taskFormSubmission = (event) => {
        event.preventDefault();
        const form  = event.currentTarget;

        const data = Object.fromEntries(new FormData(form));
        let task;

        switch (form.dataset.mode) {
            case formMode.new:
                task = taskService.createTask(data);
                break;
            case formMode.edit:
                task = taskService.updateTask(form.dataset.id, data);
                break;
        }
        onFormSubmission();
        taskModal.close();
    }

   

    return {
        openTaskModal
    }
}