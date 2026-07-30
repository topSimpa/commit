//todosController.js
import { isThisWeek, isToday, compareAsc } from  "date-fns";

import Todo from "./todo.js";
import createStorage from "./createStorage.js";
import createController from "./createController.js";


//a composition of base controller for todo and
//other utility function to manage todo
const todosController = (function () {
    const todoStorage = createStorage("todoStorage");
    const base = createController(todoStorage, Todo)

    const changeProject = base.createFieldSetter("project");
    const changeTag = base.createFieldSetter("tag");
    const changeDueDate = base.createFieldSetter("dueDate");
    const changePriority = base.createFieldSetter("priority");
    const changeDetails = base.createFieldSetter("details");

    const delByProject = (pid) => {
        const todos = todoStorage.getAll();
        console.log(todos);

        if (!todos) return todos;
        
        for (const todo of todos) {
            if (todo.project == pid) {
                todoStorage.del(pid);
            }
        }
    }

    const getByProject = (pid) => {
        const todos = todoStorage.getAll();
        console.log(todos);

        if (!todos) return todos;

        return todos.filter( ( todo ) => todo.project == pid );
    } 

    const getPriorityLevels = () => Todo.PRIORITY_LEVELS;

    const toggleStatus = (id) => {
        const todo = base.get(id);
        todo.toggleStatus();
        todoStorage.store(todo)
        console.log("toggled complete status");
    } 

    const todays = () => {
        const todos = todoStorage.getAll();
        console.log(todos);

        if (!todos) return todos;

        return todos.filter( ( todo ) => isToday( todo.dueDate ) );
        
    }

    const thisWeek = () => {
        const todos = todoStorage.getAll();
        console.log(todos);
        if (!todos) return todos;

        return todos.filter( ( todo ) => isThisWeek( todo.dueDate ) )
    }

    return {

        ...base,
        changeDetails,
        changeDueDate,
        changeTag,
        changePriority,
        changeProject,
        delByProject,
        getByProject,
        getPriorityLevels,
        thisWeek,
        todays,
        toggleStatus,

    }
})();

export default todosController;
