//projectStorage.js

const projectStorage = (
    function () {
        const rawStorage = localStorage.getItem("projectStorage");

        const storage = rawStorage ? JSON.parse(rawStorage) : {};

        const store = (id, project) => {
            storage[id] = project;
            localStorage.setItem("projectStorage", JSON.stringify(storage));
        }

        const getProject = (id) => {
            return storage[id];
        }


        const getAll = () => {
            return storage;
        }

        const del  = (id) => {
            delete storage[id];
            localStorage.setItem("projectStorage", JSON.stringify(storage));
        }

        return {
            store,
            getProject,
            getAll,
        }
    }
) ();

export default projectStorage;