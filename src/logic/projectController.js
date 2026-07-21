//projectController
import Project from "./project.js";
import { projectStorage } from "./storage.js";


function projectController() {

    const createProject = (title, description) => {
        const project = new Project(title, description);
    }


    const changeTitle = (id, newTitle)  => {
        const project = projectStorage(id);
        project.title = newTitle;
    }

    const changeDescription = (id, newDesc) => {
        const project = projectStorage(id);
        project.description = newDesc;
    }
}