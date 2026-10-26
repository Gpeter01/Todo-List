function renderNavigationContent(project, index) {
    const currentProject = document.createElement('div');
    const svgContainer = document.createElement('span');
    const projectName = document.createElement('h2');
    
    //APPEND TO CONTAINER
    const container = document.querySelector('nav');
    container.appendChild(currentProject);
    currentProject.appendChild(svgContainer);
    currentProject.appendChild(projectName);
    
    //ADD CLASS NAME
    svgContainer.classList.add('navigation-svg');
    svgContainer.classList.add(project.color);
    currentProject.classList.add(project.color);

    // ADD DATA ATTRIBUTE
    currentProject.dataset.index = index;
    
    //ADD CONTENT
    svgContainer.innerHTML = project.svg;
    projectName.textContent = project.name;
}

function renderTodoContent(todo, index) {
    const currentTodo = document.createElement('div');
    const title = document.createElement('h3');
    const description = document.createElement('p');
    const priority = document.createElement('p');
    
    //APPEND TO CONTAINER 
    const container = document.querySelector('.todo-container');
    container.appendChild(currentTodo);
    currentTodo.appendChild(title);
    currentTodo.appendChild(description);
    currentTodo.appendChild(priority);
    
    //ADD CLASS NAME
    priority.classList.add(todo.priority.toLowerCase());
    description.classList.add('description');

    // ADD DATA ATTRIBUTE
    currentTodo.dataset.index = index;

    //ADD CONTENT
    title.textContent = todo.title;
    description.textContent = todo.description;
    priority.textContent = todo.priority;
}

function iterateArray(array, currentCallback) {
    if (array.length === 0) {
        return;
    }
    for (let i = 0; i < array.length; i++) {
        currentCallback(array[i], i);
    }
}

// THERE IS AN ERROR HERE I NEED TO GET RID OF, THESE ARE THE FORM CONTROLS FOR ADDING A TODO NOT A PROJECT
function createTodoFormDisplay() {
    const dialog = document.querySelector('dialog');
    dialog.innerHTML = '';
    dialog.innerHTML = `<form action="">
            <h2>Add a new todo</h2>
            <label for="title">Title:
                <input type="text" name="title" class='title' placeholder="Grocery">
            </label>
            <label for="description">Description:
                <textarea name="description" class="description"></textarea>
            </label>
            <label for="notes">Notes:
                <textarea name="notes" class="notes"></textarea>
            </label>
            <label for="priority">Priority:
                <select name="priority" class="priority">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </label>
            <button type="button">Save</button>
        </form>`;

    const button = document.querySelector('form button');
    button.dataset.add = 'todo';
}

function createProjectFormDisplay() {
    const dialog = document.querySelector('dialog');
    dialog.innerHTML = '';
    dialog.innerHTML = ` <form action="">
            <h2>Add a project</h2>
            <label for="name">Name:
                <input type="text" class="name" name="name">
            </label>
            <label for="color">Color:
                <select name="color" class="color">
                    <option value="">Choose a color</option>
                    <option value="orange">Orange</option>
                    <option value="teal">Teal</option>
                    <option value="purple">Purple</option>
                </select>
            </label>
            <label for="theme">Theme:
                <select name="theme" class="theme">
                    <option value="">Choose a theme</option>
                    <option value="0">Health</option>
                    <option value="1">Work</option>
                    <option value="2">Grocery</option>
                    <option value="3">Private</option>
                </select>
            </label>
            <button type="button">Save</button>
        </form>`;
    const button = document.querySelector('form button');
    button.dataset.add = 'project';
}

export { renderNavigationContent, renderTodoContent, iterateArray, createProjectFormDisplay, createTodoFormDisplay }