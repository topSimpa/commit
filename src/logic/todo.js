//todos.js

export default class Todo {

    constructor({
        title, 
        project,
        details = "",
        dueDate = new Date(),
        tag = "", 
        duration = "", 
        priority = 1,

    }) {
        if (!title) {
            throw new Error("title is required");
        }

        if (!project) {
            throw new Error("project is required")
        }

        this._id = crypto.randomUUID();
        this._completed = false;

        this.title = 
        this.tag = tag;
        this.details = details;
        this.dueDate = dueDate;
        this.duration = duration;
        this.priority = priority;
        this.project = project;
        
    }

    static fromJSON(data) {
        data.dueDate = new Date(data.dueDate);
        return Object.setPrototypeOf({ ...data }, Todos.prototype)
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