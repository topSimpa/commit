//todos.js
import { defaultProjectId } from "./project.js"

const priorities  = {
    ground: 1,
    air: 2,
    sky: 3,
    sun: 4,
    storm: 5,
}


export default class Todos {
   #id;

    constructor(
        task, 
        tag="", 
        dueDate="", 
        duration="", 
        priority=priorities.ground,
        project=defaultProjectId,
    ) {

        this.#id = crypto.randomUUID();

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
}

const task = new Todos("collect package from zulei");
console.log(task);