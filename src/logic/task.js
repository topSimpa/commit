//task.js

export default class Task {

    // //named constant priority
    // static PRIORITY_LEVELS = Object.freeze({
    //     LOW : 1,
    //     MID: 2,
    //     HIGH: 3,
    // });

    constructor({
        title,
        priority,
        workspace = "",
        details = "",
        dueDate = new Date(),
    }) {
        if (!title) {
            throw new Error("title is required");
        }

        this._id = crypto.randomUUID();
        this._completed = false;

        this.title = title;
        this.details = details;
        this.dueDate = dueDate;
        this.priority = priority;
        this.workspace = workspace;
        
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


    static fromJSON(data) {
        data.dueDate = new Date(data.dueDate);
        return Object.setPrototypeOf({ ...data }, Task.prototype)
    }

}