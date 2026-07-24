//todoStorage.js

const todoStorage = (
  function () {
    const storage = {};

    const store = (id, todo) => {
        storage[id] = todo;
        localStorage.setItem("todoStorage", JSON.stringify(storage));
    }

    const getTodo = (id) => {
        let storage = localStorage.getItem("todoStorage");

        if (storage) {
            storage = JSON.parse(storage); //does parsing it change anything
            return storage[id]; // if id is not in storage far
        } else {
            return {};
        }
    }

    const getAllTodo = () => {
        let storage = localStorage.getItem("todoStorage");

        return JSON.parse(storage);
    }

    return {
        store,
        getTodo,
    }

  }  
)()

export default todoStorage;