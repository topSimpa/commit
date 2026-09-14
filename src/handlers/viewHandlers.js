//viewHandlers.js
//handlers all initial page view and interactions
// (sidebar build, switchView, changeView, active state)
import { format } from "date-fns";
import sidebarItem from "../ui-components/list/sidebarItem.js";
import { 
    activeView, viewType, smartViews, defaultWorkspace, 
    defaultViewsFilterKey, pageTitleSuffix 
} from "../data/constants.js";
import workspaceService from "../services/workspaceService.js";
import taskService from "../services/taskService.js";
import taskListItem from "../ui-components/list/taskListItem.js";


function viewHandlers ({
    viewNameUIs, 
    viewDescUI, 
    workspaceButtons,
    smartViewList,
    workspaceList,
    taskList,
    tasksContainer,
    taskPrompts,
    totalTasks,
    completeCount,
}) {
    let currentView = activeView;

    const buildSmartViewList = () => {
        smartViews.forEach((view) => {
            const item = addToSidebarList(smartViewList, view);

            if (view._id === currentView._id) {
                const viewData  = extractViewData(item);
                activeSidebarItem(item);
                changeView(viewData);
            }
        });
    }

    const buildWorkspaceList =  () => {
        workspaceList.innerHTML = "";
        const workspaces = workspaceService.getAllWorkspaces();
        
        addToSidebarList(workspaceList, defaultWorkspace);

        if (workspaces) {
            workspaces.forEach((workspace) => {
                workspace.type = viewType.custom;
                addToSidebarList(workspaceList, workspace);
            })
        }
    }

    const addToSidebarList = (sidebarList, data) => {
        const item  = sidebarItem({
            itemTitle: data.title,
            itemIcon: data.iconName,
        })
        
        item.dataset.title = data.title;
        item.dataset.viewType = data.type;
        item.dataset.desc = data.description;
        item.dataset.id = data._id;

        //handles clicking event of a sideBarListItem
        item.addEventListener("click", switchView)

        sidebarList.append(item);
        return item;
    };

    const switchView = (event) => {
        taskList.innerHTML = "";
        const sidebarItem = event.currentTarget;
        activeSidebarItem(sidebarItem);
        const viewData = extractViewData(sidebarItem);
        changeView(viewData)
        showTaskList();
    };

    const activeSidebarItem =  (target)  => {
        const sidebarItems = document
            .querySelectorAll(`.${target.className}`);

        sidebarItems.forEach((sidebarItem)  => {
            sidebarItem.classList.remove("active");
        });
        target.classList.add("active");
        currentView = {
            _id: target.dataset.id,
            type:  target.dataset.viewType,
        };
    };

    const changeView = (viewData) => {
        document.title = `${viewData.title} | ${pageTitleSuffix}`

        if (!viewData.desc) {
            viewData.desc = `All task for ${viewData.title} goes here`;
        } 
        
        viewNameUIs.forEach((UI) => UI.textContent = viewData.title);
        viewDescUI.textContent = viewData.desc;
        
        if (viewData.type === viewType.custom) {
            workspaceButtons.forEach((workspaceButton) => {
                workspaceButton.hidden = false;
                workspaceButton.dataset.id = viewData.id;
                workspaceButton.dataset.itemTitle = viewData.title;
            })
        } else if (viewData.type === viewType.default) {
            workspaceButtons.forEach((workspaceButton) => {
                workspaceButton.hidden = true;
            })
        }
    };

    const getTaskbyView = (viewId) => {
        switch(viewId) {
            case defaultViewsFilterKey.TODAY:
                return taskService.getToday();
            case defaultViewsFilterKey.WEEK:
                return taskService.getWeek();
            case defaultViewsFilterKey.ALL:
                return taskService.getAll();
            case defaultViewsFilterKey.INBOX:
                return taskService.getByWorkspace(viewId);
            case defaultViewsFilterKey.COMPLETED:
                return taskService.getCompleted();
            default:
                return {
                    collection: [],
                    completeCount: 0,
                }
        }

    }

    const extractViewData = (tabButton)  => {
        const viewData = {
            id: tabButton.dataset.id,
            title : tabButton.dataset.title,
            desc : tabButton.dataset.desc,
            type: tabButton.dataset.viewType,
        }

        return viewData;
    };

     const addtoTaskList = (data) => {
        const taskItem = taskListItem({
            id: data.id,
            title: data.title,
            dueDate: data.dueDate,
            workspace: data.workspace,
            priority: data.priority,
            completed: data.completed,
        })

        taskList.append(taskItem);
        return taskItem;
    }

    const showTaskList = () => {
        taskList.innerHTML = "";
        let tasksCollection;

        if (currentView.type === viewType.default) {
            tasksCollection = getTaskbyView(currentView._id);
        } else {
            tasksCollection = taskService.getByWorkspace(currentView._id);
        }

        if (tasksCollection.collection.length == 0)  {
            taskPrompts.hidden = false;
            tasksContainer.hidden = true;
        } else {
            tasksCollection.collection.forEach((task) => {
                task = conTaskTodisplay(task);
                const taskData = extractTaskData(task);
                addtoTaskList(taskData);
            });
            taskPrompts.hidden = true;
            tasksContainer.hidden = false;
        }
        totalTasks.forEach((total) => {
            total.textContent = `${tasksCollection.collection.length}`
        });
        completeCount.textContent = `${tasksCollection.completeCount}`;
    }

    const extractTaskData = (task) => {
        const taskData = {
            id: task._id,
            title: task.title,
            details: task.details,
            completed: task._completed,
            priority: task.priority,
            dueDate: task.dueDate,
            workspace: task.workspace,
        }

        return taskData;
    }

    const conTaskTodisplay = (task) => {
        if (task.workspace !== defaultWorkspace._id) {
            const workspace = workspaceService.get(task.workspace);
            task.workspace = workspace.title;
        }

        task.dueDate = format(task.dueDate, "E.MMM.dd");

        return task;
    }


    return {
        activeView,
        activeSidebarItem,
        buildSmartViewList,
        buildWorkspaceList,
        changeView,
        extractViewData,
        switchView,
        showTaskList,
    }
};

export default viewHandlers;