//project.js

export default class Project {

    constructor(title, description="") {
        this._id = crypto.randomUUID();

        this.title = title;
        this.description = description;
    }

    get id() {
        return this._id;
    }
}
