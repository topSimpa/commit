//ptodosController.js
//module to handle the relationship connection between project and todo

import todoStorage from "./todoStorage";
import projectStorage from "./projectStorage";
import Todos from "./todos";


const ptodosController = ( function () {

    const getProjectTodos = (pid, tid) => {
        if (projectStorage.getProject(pid)) {
            const todos = todoStorage.getAllTodo();

            if (todos) {
                let fileredTodos = {}
                for (const [key, value] of Object.entries(todos)) {
                    if (value.project == pid) {
                        fileredTodos[key] = Object.setPrototypeOf(value, Todos.prototype);
                    }
                }
                return fileredTodos;
            } else return todos;
            
        } else return {};
    } 

    const delProjectTodos = (pid, tid) => {
        const todos = getProjectTodos(pid, id);

        if (todos) {
            for (const key of Object.keys()) {
                todoStorage.del(key);
            }
        }
        console.log("delete successful");
        return true;
    }

})();