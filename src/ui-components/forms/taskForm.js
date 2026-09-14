//taskForm.js
//renders the ui for form entry needed to create a task

import { format } from "date-fns";
import "./forms.css";
import "./taskForm.css";

import { priorityLevels, defaultWorkspace } from "../../data/constants.js";


export default function createTaskForm(workspaceList) {
    const form = document.createElement("form");
    form.className = "task-forms"; 

    const newTask = () => {
        let today = new Date();
        today = format(today, "yyyy-MM-dd");

        form.append(
            createTitleInput(),
            createDetailInput(),
            createDateInput(today),
            createWorkspaceSelection(defaultWorkspace._id),
            createPriorityRadios(priorityLevels.LOW),
            createSubmitButton("Add"),
        )
        return form;
    }

    const editTask = (taskData) => {
        taskData.dueDate = format(taskData.dueDate, "yyyy-MM-dd");
        form.append(
            createTitleInput(taskData.title),
            createDetailInput(taskData.details),
            createDateInput(taskData.dueDate),
            createWorkspaceSelection(taskData.workspace),
            createPriorityRadios(taskData.priority),
            createSubmitButton("Edit"),
        )
        return form;
    }

    const createTitleInput = ( titleValue="" ) => {
        const titleLabel = document.createElement("label");
        const titleBlock = document.createElement("p");
        const titleRequired = document.createElement ("span");
        const titleInput = document.createElement("input");

        titleBlock.textContent = "Title:";
        titleRequired.textContent = "*";
        titleRequired.classList.add("asterisk");
        titleInput.name = "title";
        titleInput.placeholder = "e.g run for 100m this morning";
        titleInput.value = titleValue;
        titleInput.required = true;
        titleInput.maxLength = 50;
        titleBlock.appendChild(titleRequired);
        titleLabel.append(titleBlock, titleInput);

        return titleLabel;
    }

    const createDetailInput =  ( detailValue="" ) => {
        const detailsLabel = document.createElement("label");
        const detailsInput = document.createElement("textarea");

        detailsLabel.textContent = "Details:"
        detailsInput.name = "details";
        detailsInput.placeholder = "e.g Do this by 8:00am";
        detailsInput.rows = 4;
        detailsInput.cols = 15;
        detailsInput.value = detailValue;
        detailsLabel.appendChild(detailsInput);

        return detailsLabel
    }

    const createDateInput = (dateValue) => {
        const dueDate = document.createElement("input");
        const datelabel = document.createElement("label");

        dueDate.name = "dueDate";
        dueDate.type = "date";
        dueDate.value = dateValue;
        dueDate.min = dateValue;
        datelabel.append("Due Date: ", dueDate)

        return datelabel;
    }

    const createSubmitButton = (buttonText) => {
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.className = "submit-button";
        submitButton.textContent = buttonText;

        return submitButton;
    }

    const createWorkspaceSelection = (selectedworkspaceId = "") => {
        const label = document.createElement("label");
        const selection = document.createElement("select");

        label.textContent = "Workspace: ";
        selection.name = "workspace";

        //adding all available workspaces
        for ( const workspace of workspaceList ) {
            const option = document.createElement("option");

            option.id = workspace._id;
            option.textContent = workspace.title;
            option.value = workspace._id;
            option.selected = workspace._id === selectedworkspaceId;
            selection.appendChild(option);
        }

        label.append(selection);
        return label;
    }

    const createPriorityRadios = (currentPriority = "") => {
        const priorityBox = document.createElement("div")

        priorityBox.className = "priority-options"
        priorityBox.append("Priority: ")

        for (const [priority, value] of Object.entries(priorityLevels)) {
            const radio = document.createElement("input");
            const label = document.createElement("label");

            radio.id = `${priority}-radio`
            radio.type = "radio";
            radio.name = "priority";
            radio.value = value;
            radio.checked = value == currentPriority;

            label.htmlFor = radio.id;
            label.classList = priority;
            label.append(radio, priority);

            priorityBox.append(label);
        }
        return priorityBox;
    }

    return {
        newTask,
        editTask,
    }
}
