//projectStorage.js

const projectStorage = (
    function () {
        const storage = {};

        const save = (id, project) => {
            storage[id] = project;

            localStorage.setItem("projectStorage", JSON.stringify(storage));
        }

        const getProject = (id) => {
            let storage = localStorage.get("projectStorage");

            storage = JSON.parse(storage);
            return storage[id] //if id not in object far
        }


        const getAll = () => {
            let storage = localStorage.get("projectStorage");

            storage = JSON.parse(storage); // if storage is empty {} does it change anything
            return storage;
        }
    }
) ()

export default projectStorage;