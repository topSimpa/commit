//projectController
import Project from "./project.js";
import projectStorage from "./projectStorage.js";


const projectController =  (function () {

    const createProject = (title, description) => {
        const project = new Project(title, description);

        projectStorage.store(project.id, project);
        console.log(`project ${project.id} created successfully`);
        return project;
    }

    const getProject = (id) => {
        const project = projectStorage.getProject(id);

        Object.setPrototypeOf(project, Project.prototype);
        return project;
    }

    const changeTitle = (id, newTitle)  => {
        const project = getProject(id);
        
        project.title = newTitle;
        projectStorage.store(project.id, project);
        console.log("project title changed");
    }

    const changeDesc = (id, newDesc) => {
        const project = getProject(id);

        project.description = newDesc;
        projectStorage.store(project.id, project);
    }

    const del = (id) => {
        projectStorage.del(id);
        return true;
    }

    const getAllProject = () => {
        const projects = projectStorage.getAll();
        for ( const [key, val] of Object.entries(projects) ) {
            projects[key] = Object.setPrototypeOf(val, Project.prototype);
        }
        return projects
    }


    return {
        createProject,
        changeTitle,
        changeDesc,
        del,
        getProject,
        getAllProject,
    }
})();

export default projectController;