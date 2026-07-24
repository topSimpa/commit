//todos.js

export default class Todos {

    constructor(
        task, 
        tag="", 
        dueDate="", 
        duration="", 
        priority,
        project,
    ) {

        this._id = crypto.randomUUID();
        this._completed = false;

        this.task = task;
        this.tag = tag;
        this.dueDate = dueDate;
        this.duration = duration;
        this.priority = priority;
        this.project = project;
        
    }

    get id() {
        return this._id;
    }

    get completed() {
        return this._completed;
    }

    toggleStatus() {
        this._completed = !(this._completed);
    }
}

const task = new Todos("collect package from zulei");
console.log(task);