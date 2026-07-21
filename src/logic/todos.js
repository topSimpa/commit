//todos.js

export default class Todos {
   #id;
   #completed;

    constructor(
        task, 
        tag="", 
        dueDate="", 
        duration="", 
        priority,
        project,
    ) {

        this.#id = crypto.randomUUID();
        this.#completed = false;

        this.task = task;
        this.tag = tag;
        this.dueDate = dueDate;
        this.duration = duration;
        this.priority = priority;
        this.project = project;
        
    }

    get id() {
        return this.#id;
    }

    get completed() {
        return this.#completed;
    }

    toggleStatus() {
        this.#completed = !(this.#completed);
    }
}

const task = new Todos("collect package from zulei");
console.log(task);