//workspaceModalHandler.js
import createWorkspaceForm from "../ui-components/forms/workspaceForm.js";
import { formMode, wsModalHeading } from "../data/constants.js";
import workspaceService from "../services/workspaceService.js";

export default function wsModalHandler( workspaceModal, onFormSubmission ) {
    const openWorkspaceModal = (event) => {
        const button = event.currentTarget;
        const workspaceForm = workspaceModal.querySelector("#workspace-form");
        const title = workspaceModal.querySelector(".modal-title");
        const action = workspaceModal.querySelector(".modal-action");
        let form = createWorkspaceForm(); 

        workspaceForm.innerHTML = "";
        
        switch (button.dataset.formMode) {
            case formMode.new: 
                title.textContent = wsModalHeading.new.modalTitle;
                action.textContent = wsModalHeading.new.modalAction;
                form = form.create();
                form.dataset.mode = formMode.new;
                break;
            case formMode.edit:
                title.textContent = wsModalHeading.edit.modalTitle;
                action.textContent = wsModalHeading.edit.modalAction;
                const workspace = workspaceService.get(button.dataset.id);
                form = form.edit(workspace);
                form.dataset.mode = formMode.edit;
                form.dataset.id = workspace._id;
                break;
        }
        form.addEventListener("submit", workspaceFormSubmission);
        workspaceForm.append(form);
        workspaceModal.showModal();
    };

    const workspaceFormSubmission = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const data  = Object.fromEntries(new FormData(form));
        let workspace;
        
        switch (form.dataset.mode) {
            case formMode.new:
                workspace = workspaceService.createWorkspace(data);
                break;
            case formMode.edit:
                const wid = form.dataset.id;
                workspace = workspaceService.updateWorkspace(wid, data);
                break;
        }
    
        onFormSubmission(workspace);
        workspaceModal.close();
        
    };

    return {
        openWorkspaceModal,
    }
}