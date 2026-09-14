//module for data needed for app ui and logic to work
//what you change here affect the app directly so be careful


const pageTitleSuffix = "Commit";

const viewType = {
    custom: "custom",
    default: "default",
}

const defaultViewsFilterKey = {
    TODAY: "today",
    WEEK: "week",
    ALL: "all",
    COMPLETED: "completed",
    INBOX: "inbox"
}

const smartViews = [
    { 
        _id: defaultViewsFilterKey.TODAY,
        title: "Today",
        iconName: "\ue8df",
        description: "You got to complete these task today",
        type: viewType.default,
    },
    {
        _id: defaultViewsFilterKey.WEEK,
        title: "Week",
        iconName: "\uefe8",
        description: "See how you fare this week",
        type: viewType.default,
    },
    {
        _id: defaultViewsFilterKey.ALL,
        title: "All Task",
        iconName: "\ueb3d",
        description: "All task can be found here",
        type: viewType.default,
    },
    {
        _id: defaultViewsFilterKey.COMPLETED,
        title: "Completed",
        iconName: "\ue86c",
        description: "Good job you've completed these tasks",
        type: viewType.default,
    },
]

const activeView = smartViews[0];

const defaultWorkspace = {
    _id: defaultViewsFilterKey.INBOX,
    title: "Inbox",
    iconName: "\ue156",
    description: "a workspace for every task with no workspace",
    type: viewType.default,
}

const formMode = {
    edit: "edit",
    new: "new",
}

const wsModalHeading = {
    new: {
        modalTitle: "New workspace",
        modalAction: "Creating Workspace", 
    },
    edit: {
        modalTitle: "Workspace adjustment",
        modalAction: "Edit Workspace",
    } 
}

const taskModalHeading = {
    new: {
        modalTitle: "New Assingment",
        modalAction: "Creating Task", 
    },
    edit: {
        modalTitle: "Task viewing and refinement",
        modalAction: "View Task / Refine details",
    } 
}

const priorityLevels = {
    LOW : "low",
    MID: "medium",
    HIGH: "high",
};

const deleteType = {
    TASK: "task",
    WORKSPACE: "workspace",
}

const deleteContent = {
    TASK: {
        modalTitle: "Delete Task",
        modalAction: "Deleting.. Task",
        content: "Are you sure you want to delete"
    },
    WORKSPACE: {
        modalTitle: "Delete Workspace",
        modalAction: "Deleting.. Workspace",
        content: "Deleting workspace deletes all tasks in them,\n \
                    Are you sure you want to delete"
    }
}

export {
    activeView,
    viewType,
    smartViews, 
    defaultWorkspace,
    defaultViewsFilterKey,
    formMode, 
    wsModalHeading, 
    taskModalHeading, 
    priorityLevels,
    deleteType,
    deleteContent,
    pageTitleSuffix,
}