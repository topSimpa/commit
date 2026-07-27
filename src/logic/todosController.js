//todosController.js
import todoStorage from "./todoStorage.js";
import Todos from "./todos.js";

const todosController = (function () {
    
    const priorities  = {
        ground: 1,
        air: 2,
        sky: 3,
        sun: 4,
        storm: 5,
    }

    const createTodos = (
        task, 
        project,
        tag="", 
        dueDate="", 
        duration="", 
        priority=priorities.ground,
    ) => {
        const todo = new Todos(
            task,
            tag,
            dueDate,
            duration,
            priority,
            project,
        )

        //storage should come here to store the todos
        todoStorage.store(todo.id, todo);
        console.log(`Task ${todo.id} was created`);
    }

    const getTodo = (id) => {
        const todo = todoStorage.getTodo(id);
        Object.setPrototypeOf(todo, Todos.prototype);
        
        return todo;
    }

    const toggleStatus = (id) => {
        const todo = getTodo(id);
        todo.toggleStatus();
        todoStorage.store(todo.id, todo)
        console.log("toggled complete status");
    } 

    const addToProject = (id, projectId) => {
        const todo = getTodo(id);
        todo.project = projectId;
        todoStorage.store(todo.id, todo);
        console.log("added project successfully");
    }

    const changeTag = (id, tag) => {
        const todo = getTodo(id);
        todo.tag = tag;
        todoStorage.store(todo.id, todo);
        console.log("change todo successfully");
    }

    const dueDate = (id, date)  => {
        const todo = getTodo(id);
        todo.dueDate = date;
        todoStorage.store(todo.id, todo);
    }

    const changeDuration = (id, duration) => {
        const todo = getTodo(id);
        todo.duration = duration;
        todoStorage.store(todo.id, todo);
    }

    const changePriority = (id, priority) => {
        const todo = getTodo(id);
        todo.priority = priorities[priority];
        todoStorage.store(todo.id, todo);

    }

    const del = (id) => {
        todoStorage.del(id);
    }

    return {
        createTodos,
        getTodo,
        toggleStatus,
        addToProject,
        changeTag,
        dueDate,
        changeDuration,
        changePriority,
        del,
    }
})();

window.todosController = todosController;
export default todosController;
