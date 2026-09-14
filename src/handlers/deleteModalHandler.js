//deleteModalHandler
import { deleteType, deleteContent } from "../data/constants.js";
import taskService from "../services/taskService.js";
import workspaceService from "../services/workspaceService.js";


export default function(deleteModal, onDeletion) {
    const openDeleteModal = (event) => {
        const button = event.currentTarget;
        const deleteMessage = deleteModal.querySelector("#delete-content");
        const title = deleteModal.querySelector(".modal-title");
        const action = deleteModal.querySelector(".modal-action");
        const deleteButton = deleteModal.querySelector("#confirm-delete");

        deleteButton.dataset.id = button.dataset.id;

        switch (button.dataset.deleteType) {
            case deleteType.TASK: 
                deleteButton.dataset.type = deleteType.TASK;
                title.textContent = deleteContent.TASK.modalTitle;
                action.textContent = deleteContent.TASK.modalAction;
                deleteMessage.textContent = 
                `${deleteContent.TASK.content} ${button.dataset.itemTitle}?`;
                break;
            case deleteType.WORKSPACE:
                deleteButton.dataset.type = deleteType.WORKSPACE;
                title.textContent = deleteContent.WORKSPACE.modalTitle;
                action.textContent = deleteContent.WORKSPACE.modalAction;
                deleteMessage.textContent = 
                `${deleteContent.WORKSPACE.content} ${button.dataset.itemTitle}?`;
                break;
        }
        deleteButton.addEventListener("click", onClickDelete);
        deleteModal.showModal();
    };

    const onClickDelete = (event) => {
        event.preventDefault();
        const button = event.currentTarget;
        const itemId = button.dataset.id;
        
        switch (button.dataset.type) {
            case deleteType.TASK:
                taskService.deleteTask(itemId);
                break;
            case deleteType.WORKSPACE:
                taskService.deleteByWorkspace(itemId);
                workspaceService.del(itemId);
                break;
        }
    
        onDeletion(button.dataset.type);
        deleteModal.close();
        
    };

    return {
        openDeleteModal,
    }
}