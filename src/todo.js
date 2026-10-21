const projects = [];

class TodoList {
    array = [];
    constructor(name, color, svg) {
        this.name = name;
        this.color = color;
        this.svg = svg;
    }
}

class Todo {
    constructor(title, description, priority, notes) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.notes = notes;
    }
}