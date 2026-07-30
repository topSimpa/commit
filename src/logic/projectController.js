//projectController
import Project from "./project.js";
import createStorage from "./createStorage.js";
import createController from "./createController.js";

// returns a composition of controller for project and 
// other utility function to manage project object
const projectController =  (function () {
    const projectStorage = createStorage("projectStorage");
    const base = createController(projectStorage, Project);

    const changeDescription = base.createFieldSetter("description");
    const changeTitle = base.createFieldSetter("title");

    return {
      ...base,
      changeDescription,
      changeTitle,
    }
})();

export default projectController;