function renderNavigationContent(project) {
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
    currentProject.classList.add(project.color);
    
    //ADD CONTENT
    svgContainer.innerHTML = project.svg;
    projectName.textContent = project.name;
}

function renderTodoContent(todo) {
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
        currentCallback(array[i]);
    }
}

export { renderNavigationContent, renderTodoContent, iterateArray }