//Workspace.js

export default class Workspace {

    constructor({
        title, 
        description=""
    }) {
        this._id = crypto.randomUUID();

        this.title = title;
        this.description = description;
    }

    static fromJSON(data) {
        return Object.setPrototypeOf(data, Workspace.prototype);
    }

    get id() {
        return this._id;
    }
}
