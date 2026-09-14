//workspaceController.js
import Workspace from "./workspace.js";
import createStorage from "./createStorage.js";
import createController from "./createController.js";

// returns a composition of controller for Workspace and 
// other utility function to manage Workspace object
const workspaceController =  (function () {
    const workspaceStorage = createStorage("workspaceStorage");
    const base = createController(workspaceStorage, Workspace);

    return {
      ...base,
    }
})();

export default workspaceController;