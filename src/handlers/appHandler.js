//appHandler.js
import { format } from "date-fns";
import viewHandlers from "./viewHandlers.js";
import wsModalHandler from "./workspaceModalHandler.js";
import taskModalHandler from "./taskModalHandlers.js";
import taskService from "../services/taskService.js";
import { defaultWorkspace, deleteType, formMode } from "../data/constants.js";
import deleteModalHandler from "./deleteModalHandler.js";


export default function AppHandler({
    smartViewList,
    workspaceList,
    taskList,
    viewNameUIs,
    viewDescUI,
    workspaceButtons,
    workspaceModal,
    taskModal,
    tasksContainer,
    taskPrompts,
    totalTasks,
    todayDate,
    completeCount,
    deleteModal,
}) {
    const appView = viewHandlers({
        viewDescUI,
        viewNameUIs,
        workspaceButtons,
        smartViewList,
        workspaceList,
        taskList,
        tasksContainer,
        taskPrompts,
        totalTasks,
        completeCount,
        deleteModal,
    });

    const startApp = () =>  {
        const today = format (new Date(), "EEEE, MMMM dd, yyyy");
        todayDate.textContent = today;
        appView.buildSmartViewList();
        appView.buildWorkspaceList();
        appView.showTaskList();
        taskList.addEventListener( "toggle:complete",ontoggleComplete );
        taskList.addEventListener( "task:view", onViewTask );
        taskList.addEventListener( "task:delete", onDeleTask );
    }

    const onWsFormSubmission = (workspaceObj) => {
        appView.buildWorkspaceList();
        const sidebarItem = workspaceList
            .querySelector(`[data-id="${workspaceObj._id}"]`);
        const viewData = appView.extractViewData(sidebarItem);
    
        appView.activeSidebarItem(sidebarItem);
        appView.changeView(viewData);
        appView.showTaskList();
    };

    const workspaceModalHandler = 
        wsModalHandler(workspaceModal, onWsFormSubmission);

    const closModal  = (event) => {
        const modal = event.target.closest("dialog");
        modal.close();
    };

    const ontaskFormSubmission = () => appView.showTaskList();

    const tsModalHandler = taskModalHandler( taskModal, ontaskFormSubmission );

    const ontoggleComplete =  (event) => {
        if (event.detail.checked) {
            completeCount.textContent = `${++completeCount.textContent}`;
        } else {
            completeCount.textContent = `${--completeCount.textContent}`;
        }
        const taskId = event.detail.tid;
        taskService.toggleComplete(taskId);
    }

    const onViewTask = (event) => {
        const taskId = event.detail.tid;
        const eventObject = {
            currentTarget: {
                dataset: {
                    taskId,
                    formMode: formMode.edit,
                }
            }
        }
        tsModalHandler.openTaskModal(eventObject);
    }

    const onDeleTask = (event) => {
        const id = event.detail.tid;
        const type = event.detail.type;
        const itemTitle = event.detail.title;
        const eventObject = {
            currentTarget: {
                dataset: {
                    deleteType: type,
                    id,
                    itemTitle,
                }
            }
        }
        dleteModalHandler.openDeleteModal(eventObject);
    }

    const onDeletion =  (type) => {
        switch(type) {
            case deleteType.TASK:
                appView.showTaskList();
                break;
            case deleteType.WORKSPACE:
                appView.buildWorkspaceList();
                const eventObject = {
                    currentTarget: 
                        workspaceList
                            .querySelector(`[data-id="${defaultWorkspace._id}"]`),
                }
                appView.switchView(eventObject);
                break;
        }


    }
    const dleteModalHandler = deleteModalHandler( deleteModal, onDeletion );

    startApp();

    return {
        openWorkspaceModal: workspaceModalHandler.openWorkspaceModal,
        closModal,
        openTaskModal: tsModalHandler.openTaskModal,
        openDeleteModal: dleteModalHandler.openDeleteModal,
    }
}
