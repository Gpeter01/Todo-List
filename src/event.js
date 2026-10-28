import { createProjectFormDisplay, createTodoFormDisplay, renderTodoContent, renderNavigationContent, iterateArray, expand, contract, editTodo } from "./ui-content.js";
import { projects, svgArray, TodoList, Todo } from "./todo.js";
import { pushToStorage } from "./storage.js";

function executeNavigationBoxClick(event) {
    const button = event.target.closest('[data-action]');
    if (button) {
        const dialog = document.querySelector('dialog');
        dialog.showModal();
        createProjectFormDisplay();
        return;
    }
    const navElement = event.target.closest('[data-index]');
    if (navElement) {
        const index = Number(navElement.dataset.index);
        const todoContainer = document.querySelector('.todo-container');
        const button = document.querySelector('.todo-box [data-action]');
        button.dataset.index = index;

        todoContainer.innerHTML = '';
        iterateArray(projects[index].array, renderTodoContent);
        return;
    }
}

function executeTodoBoxClick(event) {
    const button = event.target.closest('[data-action]');
    if (!button) {
        return;
    }
    if (button.dataset.action === 'add') {
        const dialog = document.querySelector('dialog');
        dialog.showModal();
        createTodoFormDisplay();
        return;
    }
    if (button.dataset.action === 'expand') {
        const todo = event.target.closest('[data-index][data-project-index]');
        expand(projects[Number(todo.dataset.projectIndex)].array[todo.dataset.index], todo);
        return;
    }
    if (button.dataset.action === 'contract') {
        const todo = event.target.closest('[data-index][data-project-index]');
        contract(projects[Number(todo.dataset.projectIndex)].array[todo.dataset.index], todo);
        return;
    }
    if (button.dataset.action === 'delete') {
        const todo = event.target.closest('[data-index][data-project-index]');
        projects[Number(todo.dataset.projectIndex)].array.splice(Number(todo.dataset.index), 1);
        pushToStorage();
        
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = '';
        iterateArray(projects[Number(todo.dataset.projectIndex)].array, renderTodoContent);
    }
    if (button.dataset.action === 'edit') {
        const todo = event.target.closest('[data-index][data-project-index]');
        editTodo(Number(todo.dataset.index), Number(todo.dataset.projectIndex));

        const dialog = document.querySelector('dialog');
        dialog.showModal();
    }
}

function executeDialogClick(event) {
    event.preventDefault();
    
    const button = event.target.closest('[data-add]')
    if (!button) {
        return;
    }
    if (button.dataset.add === 'project') {
        const projectName = document.querySelector('.name');
        const color = document.querySelector('.color');
        const theme = document.querySelector('.theme');
        
        projects.push(new TodoList(projectName.value, color.value, svgArray[Number(theme.value)]));
        const navigationContainer = document.querySelector('nav');
        navigationContainer.innerHTML = '';
        pushToStorage();
        iterateArray(projects, renderNavigationContent);
        
        // CLOSE DIALOG
        const dialog = document.querySelector('dialog');
        dialog.close();
    }
    const title = document.querySelector('form .title');
    const description = document.querySelector('form .description');
    const notes = document.querySelector('form .notes');
    const priority = document.querySelector('form .priority');

    if (button.dataset.add === 'todo') {
        const button = document.querySelector('.todo-box [data-action]');
        projects[Number(button.dataset.index)].array.push(new Todo(title.value, description.value, priority.value, notes.value));
        
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = '';
        pushToStorage();
        iterateArray(projects[Number(button.dataset.index)].array, renderTodoContent);
        
        // CLOSE DIALOG
        const dialog = document.querySelector('dialog');
        dialog.close();
        
    }
    if (button.dataset.add === 'edit') {
        const button = document.querySelector('.todo-box [data-action]');
        const formButton = document.querySelector('form button');
        projects[Number(button.dataset.index)].array[formButton.dataset.editIndex] = new Todo(title.value, description.value, priority.value, notes.value);
        
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = '';
        pushToStorage();
        iterateArray(projects[Number(button.dataset.index)].array, renderTodoContent);
        
        // CLOSE DIALOG
        const dialog = document.querySelector('dialog');
        dialog.close();
    }
}

export {executeNavigationBoxClick, executeDialogClick, executeTodoBoxClick }