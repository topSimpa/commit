//tasksController.js
import { isThisWeek, isToday } from  "date-fns";

import Task from "./task.js";
import createStorage from "./createStorage.js";
import createController from "./createController.js";


//a composition of base controller for Task and
//other utility function to manage Task
const tasksController = (function () {
    const taskStorage = createStorage("taskStorage");
    const { getAll, ...base } = createController(taskStorage, Task);


    const getAllTask = () => {
        const tasksList = taskStorage.getAll();
        return collectionObject(tasksList);
    }

    const delByWorkspace = (wid) => {
        const tasks = taskStorage.getAll();

        for (const task of tasks) {
            if (task.workspace == wid) {
                taskStorage.del(task.id);
            }
        }
    }

    const getByWorkspace = (wid) => {
        const tasks = taskStorage.getAll();

        //filter out task with wid workspace id
        const workspaceTasks = tasks.filter( ( task ) => {
            const taskObj = Task.fromJSON(task);
            return taskObj.workspace == wid 
        });

        return collectionObject(workspaceTasks);
    } 

    const toggleStatus = (id) => {
        const task = taskStorage.get(id);
        const taskObj = Task.fromJSON(task);
        taskObj.toggleStatus();
        taskStorage.store(taskObj)
        return true;
    } 

    const todays = () => {
        const tasks = taskStorage.getAll();

        const todaysTask =  tasks.filter( ( task ) => {
            const taskObj = Task.fromJSON(task);   
            return isToday( taskObj.dueDate ) 
        })

        return collectionObject(todaysTask);
    }

    const thisWeek = () => {
        const tasks = taskStorage.getAll();
      
        const weekTasks = tasks.filter( ( task ) => {
            const taskObj = Task.fromJSON( task );
            return isThisWeek( taskObj.dueDate ); 
        })
        
        return collectionObject(weekTasks);
    }

    const completed = () => {
        const tasks = taskStorage.getAll();

        const completedTask = tasks.filter (( task ) => task._completed);
        const returnObject = {
            collection: completedTask,
            completeCount: completedTask.length,
        }
        return JSON.stringify(returnObject);
    }

    const collectionObject = ( taskList ) => {
        let completeCount = 0;

        taskList.forEach(( task ) => {
            if (task._completed) completeCount++;
        });

        const returnObject = {
            collection: taskList,
            completeCount,
        }

        return JSON.stringify(returnObject);
    }

    return {

        ...base,
        delByWorkspace,
        getByWorkspace,
        getAllTask,
        thisWeek,
        todays,
        toggleStatus,
        completed,
    }
})();

export default tasksController;
