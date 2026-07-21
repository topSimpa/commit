//project.js

export default class Project {
   #id;

    constructor(title, description="") {
        this.#id = crypto.randomUUID();

        this.title = title;
        this.description = description;
    }

    get id() {
        return this.#id;
    }
}