//todosController.js
import todoStorage from "./todoStorage.js";
import Project from "./project.js";
import Todos from "./todos.js";

function TodosController() {
    const defaultProject = new Project(
        "Inbox",
        "All your tasks/todos leaves here by default"
    )


    const priorities  = {
        ground: 1,
        air: 2,
        sky: 3,
        sun: 4,
        storm: 5,
    }

    const createTodos = (
        task, 
        tag="", 
        dueDate="", 
        duration="", 
        priority=priorities.ground,
        project=defaultProject.id,
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
        Object.setPrototypeOf(todo, Todos);
        
        return todo;
    }

    const toggleStatus = (id) => {
        //get the todo from the storage
        todo = todoStorage[id];
        todoStorage.store(todo.id, todo)
    } 

    const addToProject = (id, projectId) => {
        todo = todoStorage[id];
        todo.project = projectId;
        console.log("added project successfully");
    }

    const changeTag = (id, tag) => {
        todo = todoStorage[id];
        todo.tag = tag;
        console.log("change todo successfully");
    }

    const dueDate = (id, date)  => {
        todo = todoStorage[id];
        todo.dueDate = date;
    }

    const changeDuration = (id, duration) => {
        todo = todoStorage[id];
        todo.duration = duration;
    }

    return {
        createTodos,
        getTodo,
        toggleStatus,
        addToProject,
        changeTag,
        dueDate,
        changeDuration
    }
}


const todosController = TodosController();

window.todosController = todosController;
