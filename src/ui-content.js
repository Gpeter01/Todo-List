import { projects } from "./todo.js";
import { formatDate, approximate } from "./time.js";

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
    const dueDate = document.createElement('p');
    const approximation = document.createElement('p');
    const priority = document.createElement('p');
    const priorityContainer = document.createElement('div');
    const container = document.createElement('div');
    const buttonContainer = document.createElement('div');
    const expandButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');

    const button = document.querySelector('.todo-box [data-action]');
    
    //APPEND TO CONTAINER 
    const parentContainer = document.querySelector('.todo-container');
    parentContainer.appendChild(currentTodo);
    currentTodo.appendChild(title);
    currentTodo.appendChild(dueDate);
    currentTodo.appendChild(approximation);
    currentTodo.appendChild(container);
    container.appendChild(priorityContainer);
    priorityContainer.appendChild(priority);
    container.appendChild(buttonContainer);
    buttonContainer.appendChild(expandButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);
    
    //ADD CLASS NAME
    priority.classList.add(todo.priority.toLowerCase());
    priority.classList.add('priority');
    buttonContainer.classList.add('todo-button-container');
    priorityContainer.classList.add('priority-container')

    // ADD DATA ATTRIBUTE
    currentTodo.dataset.index = index;
    currentTodo.dataset.projectIndex = button.dataset.index;
    expandButton.dataset.action = 'expand';
    deleteButton.dataset.action = 'delete';
    editButton.dataset.action = 'edit';
    
    //ADD CONTENT
    title.textContent = todo.title;
    dueDate.textContent = `dueDate: ${formatDate(todo.dueDate)}`;
    approximation.textContent = `${approximate(todo.dueDate)}`;
    priority.textContent = todo.priority;
    expandButton.textContent = 'Expand';
    deleteButton.textContent = 'Delete';
    editButton.textContent = 'Edit';
}

function iterateArray(array, currentCallback) {
    if (array.length === 0) {
        return;
    }
    for (let i = 0; i < array.length; i++) {
        currentCallback(array[i], i);
    }
}

function createTodoFormDisplay() {
    const exitSVG = `<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>cancel</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="work-case" fill="#000000" transform="translate(91.520000, 91.520000)">
                <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">

    </polygon>
            </g>
        </g>
    </svg>`;
    const dialog = document.querySelector('dialog');
    dialog.innerHTML = '';
    dialog.innerHTML = `<form action="">
            <div class='dialog-exit-container'>
                <button type='button' class='exit'>${exitSVG}</button>
            </div>
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
            <label for='due-date'>Due date:
                <input type='date' data-add='date-min' name='due-date' class='due-date'>
            </label>
            <label for='due-time'>Time:
                <input type='time' data-add='time-min' name='due-time' class='due-time'>
            </label>
            <label for="priority">Priority:
                <select name="priority" class="priority">
                    <option value="null">Select</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </label>
            <p class='info'><p>
            <button class='save' type="button">Save</button>
        </form>`;

    const cancelButton = document.querySelector('.exit');
    cancelButton.dataset.action = 'exit';
    const button = document.querySelector('.save');
    button.dataset.add = 'todo';
}

function createProjectFormDisplay() {
    const exitSVG = `<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>cancel</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="work-case" fill="#000000" transform="translate(91.520000, 91.520000)">
                <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">

    </polygon>
            </g>
        </g>
    </svg>`;
    const dialog = document.querySelector('dialog');
    dialog.innerHTML = '';
    dialog.innerHTML = ` <form action="">
            <div class='dialog-exit-container'>
                <button type='button' class='exit'>${exitSVG}</button>
            </div>
            <h2>Add a project</h2>
            <label for="name">Name:
                <input type="text" class="name" name="name" placeholder='Work'>
            </label>
            <label for="color">Color:
                <select name="color" class="color">
                    <option value="null">Choose a color</option>
                    <option value="orange">Orange</option>
                    <option value="teal">Teal</option>
                    <option value="purple">Purple</option>
                </select>
            </label>
            <label for="theme">Theme:
                <select name="theme" class="theme">
                    <option value="null">Choose a theme</option>
                    <option value="0">Health</option>
                    <option value="1">Work</option>
                    <option value="2">Grocery</option>
                    <option value="3">Private</option>
                </select>
            </label>
            <p class='info'><p>
            <button class='save' type="button">Save</button>
        </form>`;
    const cancelButton = document.querySelector('.exit');
    cancelButton.dataset.action = 'exit';
    const button = document.querySelector('.save');
    button.dataset.add = 'project';
}

function expand(todo, element) {
    const h3 = document.createElement('h3');
    const dueDate = document.createElement('p');
    const description = document.createElement('h4');
    const descriptionDetails = document.createElement('p');
    const notes = document.createElement('h4');
    const notesDetails = document.createElement('p');
    const priority = document.createElement('p');
    const buttonContainer = document.createElement('div');
    const expandButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    const priorityContainer = document.createElement('div');
    const container = document.createElement('div');

    element.innerHTML = '';
    element.appendChild(h3);
    element.appendChild(dueDate);
    element.appendChild(description);
    element.appendChild(descriptionDetails);
    element.appendChild(notes);
    element.appendChild(notesDetails);
    element.appendChild(container);
    container.appendChild(priorityContainer);
    priorityContainer.appendChild(priority);
    container.appendChild(buttonContainer);
    buttonContainer.appendChild(expandButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);
    
    element.classList.toggle('is-active');
    descriptionDetails.classList.toggle('expand');
    notesDetails.classList.toggle('expand');
    priority.classList.add('priority');
    priority.classList.add(todo.priority.toLowerCase());
    buttonContainer.classList.add('todo-button-container');
    priorityContainer.classList.add('priority-container')
    expandButton.dataset.action = 'contract';
    deleteButton.dataset.action = 'delete';
    editButton.dataset.action = 'edit';
    
    
    h3.textContent = todo.title;
    dueDate.textContent = `dueDate: ${formatDate(todo.dueDate)}`;
    description.textContent = 'Description:';
    descriptionDetails.textContent = todo.description;
    notes.textContent = 'Notes:';
    notesDetails.textContent = todo.notes;
    priority.textContent = todo.priority;
    expandButton.textContent = 'Show Less';
    deleteButton.textContent = 'Delete';
    editButton.textContent = 'Edit';
}

function contract(todo, element) {
    const title = document.createElement('h3');
    const dueDate = document.createElement('p');
    const approximation = document.createElement('p');
    const description = document.createElement('p');
    const priority = document.createElement('p');
    const buttonContainer = document.createElement('div');
    const expandButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');
    const priorityContainer = document.createElement('div');
    const container = document.createElement('div');
    
    
    const button = document.querySelector('.todo-box [data-action]');
    
    element.classList.toggle('is-active');
    element.innerHTML = '';
    element.appendChild(title);
    element.appendChild(dueDate);
    element.appendChild(approximation);
    element.appendChild(container);
    container.appendChild(priorityContainer);
    priorityContainer.appendChild(priority);
    container.appendChild(buttonContainer);
    buttonContainer.appendChild(expandButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);
    
    //ADD CLASS NAME
    priority.classList.add(todo.priority.toLowerCase());
    priority.classList.add('priority');
    description.classList.add('description');
    buttonContainer.classList.add('todo-button-container');
    priorityContainer.classList.add('priority-container') 
    
    // ADD DATA ATTRIBUTE
    expandButton.dataset.action = 'expand';
    deleteButton.dataset.action = 'delete';
    editButton.dataset.action = 'edit';

    //ADD CONTENT
    title.textContent = todo.title;
    dueDate.textContent = `dueDate: ${formatDate(todo.dueDate)}`;
    approximation.textContent = `${approximate(todo.dueDate)}`;
    priority.textContent = todo.priority;
    expandButton.textContent = 'Expand';
    deleteButton.textContent = 'Delete';
    editButton.textContent = 'Edit';
}

function editTodo(index, parentIndex) {
    createTodoFormDisplay();
    const header = document.querySelector('dialog h2');
    header.textContent = 'Edit todo';

    const title = document.querySelector('form .title');
    const description = document.querySelector('form .description');
    const notes = document.querySelector('form .notes');
    const priority = document.querySelector('form .priority');
    const dueTime = document.querySelector('form .due-time');
    const dueDate = document.querySelector('form .due-date');
    
    const currentTodo = projects[parentIndex].array[index];
    title.value = currentTodo.title;
    description.value = currentTodo.description;
    notes.value = currentTodo.notes;
    priority.value = currentTodo.priority;
    dueDate.value = currentTodo.dateValue;
    dueTime.value = currentTodo.timeValue;

    const button = document.querySelector('.save');
    button.textContent = 'Save Changes';
    button.dataset.add = 'edit';
    button.dataset.editIndex = index;
}

function getCurrentPage() {
    const button = document.querySelector('.todo-box [data-action]');
    if (localStorage.getItem('currentPage') == null) {
        button.dataset.index = '0';

        // DISPLAY TODOS
        // DEFAULT PROJECT SHOULD BE PERSONAL FOR THIS CASE
        iterateArray(projects[0].array, renderTodoContent);
        return;
    }
    const currentIndex = JSON.parse(localStorage.getItem('currentPage'));
    button.dataset.index = currentIndex;
    iterateArray(projects[currentIndex].array, renderTodoContent);
}

function aboutThisProject() {
    const exitSVG = `<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>cancel</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="work-case" fill="#000000" transform="translate(91.520000, 91.520000)">
                <polygon id="Close" points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">

    </polygon>
            </g>
        </g>
    </svg>`;
    const dialog = document.querySelector('dialog');
    dialog.innerHTML = ` 
        <div class='dialog-exit-container'>
                <button type='button' class='exit'>${exitSVG}</button>
        </div>
        <h2>About this project</h2>
        <p>This is a really amazing project, it's a really nice todolist. It has room to grow.</p>
        <p>The svgs you see here are gotten from .....</p>
        <p>To reset the todolist app to factory setting, click below. Be careful, there is no going back.</p>
        <button class="reset">Reset to factory setting</button>`;

    const cancelButton = document.querySelector('.exit');
    cancelButton.dataset.action = 'exit';

    const resetButton = document.querySelector('.reset');
    resetButton.dataset.add = 'reset';
}

function capitaliseFirstLetter(value) {
    const firstLetter = value.trim().charAt(0).toUpperCase();
    const rest = value.trim().slice(1);
    return `${firstLetter}${rest}`;
}

export { renderNavigationContent, renderTodoContent, iterateArray, createProjectFormDisplay, createTodoFormDisplay, expand, contract, editTodo, getCurrentPage, aboutThisProject, capitaliseFirstLetter }