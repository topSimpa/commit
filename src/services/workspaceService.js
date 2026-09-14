//workspaceService.js
// this module takes care of flow of workspace data;

import workspaceController from "../logic/workspaceController.js";

const workspaceService = (function (){

    const createWorkspace = (data) => {
        const workspaceRaw = workspaceController.create(data);
        const workspace = JSON.parse(workspaceRaw);

        //this helps in the ui logic;
        workspace.type = "custom";

        return workspace;
    }

    const del = (id) => {
        return workspaceController.del(id);
    }

    const get = (id) => {
        const workspace = workspaceController.get(id);

        return JSON.parse(workspace);
    }

    const getAllWorkspaces = () => {
        const workspacesRaw = workspaceController.getAll();
        const workspaces = JSON.parse(workspacesRaw);
        
        return workspaces
    }
    
    const getWorkspace = (id) => {
        const workspaceRaw = workspaceController.get(id);
        const workspace = JSON.parse(workspaceRaw);
        
        return workspace;
    }

    const updateWorkspace = (id, dataObject) => {
        const workspaceRaw = workspaceController.update(id, dataObject);
        const workspace = JSON.parse(workspaceRaw);

        workspace.type = "custom";
        return workspace;

    }


    return {
        createWorkspace,
        del,
        get,
        getAllWorkspaces,
        getWorkspace,
        updateWorkspace,
    }

})();

export default workspaceService;



