 //todoStorage.js

const todoStorage = (
  function () {
    const rawStorage = localStorage.getItem("todoStorage");

    //loading up storage
    const  storage = rawStorage ? JSON.parse(rawStorage) : {};

    const store = (id, todo) => {
        storage[id] = todo;
        localStorage.setItem("todoStorage", JSON.stringify(storage));
    }

    const getTodo = (id) => {
        return storage[id];
    }

    const getAllTodo = () => {
        return storage;
    }

    const del = (id) => {
        delete storage[id];
        localStorage.setItem("todoStorage", JSON.stringify(storage));
    }

    return {
        store,
        getTodo,
        getAllTodo,
        del,
    }

  }  
)()

export default todoStorage;