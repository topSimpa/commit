//createProjectForm.js
import "./forms.css";

export default function createWorkspaceForm() {
    const form = document.createElement("form");
    
    form.className = "workspace-form";
    
    const create = () => {
        form.append(
            createTitleInput(),
            createDescInput(),
            createSubmitButton("create")
        )
        return form;
    }

    const edit = (workspaceData) => {
        form.append(
            createTitleInput(workspaceData.title),
            createDescInput(workspaceData.description),
            createSubmitButton("update")
        )
        return form;
    }
    
    const createTitleInput = ( title="" ) => {
        const titleLabel = document.createElement("label");
        const titleBlock = document.createElement("p");
        const asterisk = document.createElement("span");
        const titleInput = document.createElement("input");

        titleBlock.textContent = "Title:"
        asterisk.textContent = "*";
        asterisk.className = "asterisk";
        titleInput.name = "title";
        titleInput.placeholder = "e.g fitness"
        titleInput.value = title;
        titleInput.maxLength = 15;
        titleInput.required = true;
        titleBlock.append(asterisk);
        titleLabel.append(titleBlock, titleInput);

        return titleLabel;
    }
    
    const createDescInput = ( description="" ) => {
        const descriptionLabel = document.createElement("label");
        const descriptionInput = document.createElement("textarea");
        descriptionLabel.textContent = "Description:";
        descriptionInput.name = "description";
        descriptionInput.placeholder = "e.g all activities task to make me fit";
        descriptionInput.rows = 4;
        descriptionInput.cols = 15;
        descriptionInput.maxLength = 50;
        descriptionInput.value = description;
        descriptionLabel.append(descriptionInput)

        return descriptionLabel;
    }

    const createSubmitButton = (text) => {
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.textContent = text;
        submitButton.className = "submit-button";

        return submitButton;
    }

    return {
        create,
        edit,
    }
}
