//taskService.js
// this module takes care of flow of task data between app and backend
import tasksController from "../logic/taskController.js";

const taskService = ( function () {
    
    const createTask = (taskData) => {
        const task = tasksController.create(taskData);

        return JSON.parse(task);
    }

    const deleteTask = (id) => {
        return tasksController.del(id);
    }

    const deleteByWorkspace = (wid) => {
        return tasksController.delByWorkspace(wid);
    }

    const getByWorkspace = (workspaceId) => {
        const collectionObject  = tasksController.getByWorkspace(workspaceId);

        return JSON.parse(collectionObject);
    }

    const getAll = () => {
        const collectionObject = tasksController.getAllTask();

        return JSON.parse(collectionObject);
    }

    const getCompleted = () => {
        const collectionObject = tasksController.completed();
    
        return JSON.parse(collectionObject);
    }

    const getTask = (id) => {
        const task = tasksController.get(id);

        return JSON.parse(task);
    }

    const getToday = () => {
        const collectionObject = tasksController.todays();

        return JSON.parse(collectionObject);
    }

    const getWeek = () => {
        const collectionObject = tasksController.thisWeek();

        return JSON.parse(collectionObject);
    }

    const toggleComplete =  (id) => {
        tasksController.toggleStatus(id);
    }

    const updateTask = (id, taskData) => {
        let task = tasksController.update(id, taskData);
        task = JSON.parse(task);

        return task;
    }

    return {
        createTask,
        deleteTask,
        deleteByWorkspace,
        getByWorkspace,
        getTask, 
        getToday,
        getWeek,
        getAll,
        getCompleted,
        toggleComplete,
        updateTask,
    }

})();

export default taskService;