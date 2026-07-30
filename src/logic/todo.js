//todos.js

export default class Todo {

    //named constant priority
    static PRIORITY_LEVELS = Object.freeze({
        LOW : 1,
        MID: 2,
        HIGH: 3,
    });

    constructor({
        title, 
        project = "",
        details = "",
        dueDate = new Date(),
        tag = "", 
        duration = "", 
        priority = Todo.PRIORITY_LEVELS.LOW,

    }) {
        if (!title) {
            throw new Error("title is required");
        }

        this._id = crypto.randomUUID();
        this._completed = false;

        this.title = title;
        this.tag = tag;
        this.details = details;
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

    get priority () {
        return this._priority;
    }

    set priority (value) {
        if ( !( value in Object.values( Todo.PRIORITY_LEVELS ) ) ) {
            throw new Error("Invalid priority value");
        }

        this._priority = value;
    }

    static fromJSON(data) {
        data.dueDate = new Date(data.dueDate);
        return Object.setPrototypeOf({ ...data }, Todo.prototype)
    }

}