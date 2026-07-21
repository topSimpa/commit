//todosController.js
import { todoStorage } from "./storage.js";
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
        todoStorage[`${todo.id}`] = todo;
        console.log(`Task ${todo.id} was created`);
    }

    const toggleStatus = (id) => {
        //get the todo from the storage
        todo = todoStorage[id];
        todo.toggleStatus();
        console.log(todo);
    } 

    const addToProject = (id, projectId) => {
        todo = todoStorage[id];
        todo.project = projectId;
        console.log("added project successfully");
    }

    return {
        createTodos,
        toggleStatus,
        addToProject,
    }
}


// const todosController = TodosController();

// todosController.createTodos(  "pray tommorrow morning" );
// window.storage = todoStorage;
