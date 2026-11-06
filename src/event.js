import { createProjectFormDisplay, createTodoFormDisplay, renderTodoContent, renderNavigationContent, iterateArray, getCurrentPage, expand, contract, editTodo, aboutThisProject, capitaliseFirstLetter } from "./ui-content.js";
import { projects, svgArray, TodoList, Todo, populate } from "./todo.js";
import { pushToStorage } from "./storage.js";
import { getDateOfThisMoment, getTimeOfThisMoment, getCurrentDate } from "./time.js";
import { dateCheck, checkProjectName, dropdownCheck, checkTodo } from "./errorCheck.js";

function executeNavigationBoxClick(event) {
    const button = event.target.closest('[data-action]');
    if (button) {
        const dialog = document.querySelector('dialog');
        dialog.showModal();
        createProjectFormDisplay();

        const projectName = document.querySelector('.name');
        projectName.focus();
        return;
    }
    const navElement = event.target.closest('[data-index]');
    if (navElement) {
        navElement.classList.add('is-active');
        const index = Number(navElement.dataset.index);
        const todoContainer = document.querySelector('.todo-container');
        const button = document.querySelector('.todo-box [data-action]');
        button.dataset.index = index;

        // PUSH TO STORAGE
        pushToStorage('currentPage', index);

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

        const title = document.querySelector('.title');
        title.focus();
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
        pushToStorage('storage', projects);
        
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = '';
        iterateArray(projects[Number(todo.dataset.projectIndex)].array, renderTodoContent);
        return;
    }
    if (button.dataset.action === 'edit') {
        const todo = event.target.closest('[data-index][data-project-index]');
        editTodo(Number(todo.dataset.index), Number(todo.dataset.projectIndex));
        
        const dialog = document.querySelector('dialog');
        dialog.showModal();
        const title = document.querySelector('.title');
        title.focus();
        return;
    }
}

function closeDialog(event) {
    const cancelButton = event.target.closest("[data-action]");
    if (!cancelButton) {
        return;
    }
    const dialog = document.querySelector('dialog');
    dialog.close();
}

function executeDialogClick(event) {
    const dialogElement = event.target.closest('[data-add]');
    if (!dialogElement) {
        return;
    }
    if (dialogElement.dataset.add === 'date-min') {
        dialogElement.min = getDateOfThisMoment();
        return;
    }
    if (dialogElement.dataset.add === 'time-min') {
        dialogElement.min = getTimeOfThisMoment();
        return;
    }
    if (dialogElement.dataset.add === 'project') {
        const projectName = document.querySelector('.name');
        const color = document.querySelector('.color');
        const theme = document.querySelector('.theme');

        // CHECKS
        if (checkProjectName(projectName.value)) {
            return;
        }
        if (dropdownCheck(color.value, 'Pick a color.')) {
            return;
        }
        if (dropdownCheck(theme.value, 'You are almost there, pick a theme.')) {
            return;
        }

        projects.push(new TodoList(capitaliseFirstLetter(projectName.value), color.value, svgArray[Number(theme.value)]));
        const navigationContainer = document.querySelector('nav');
        navigationContainer.innerHTML = '';
        pushToStorage('storage', projects);
        iterateArray(projects, renderNavigationContent);
        
        // CLOSE DIALOG
        const dialog = document.querySelector('dialog');
        dialog.close();
        return;
    }
    if (dialogElement.dataset.add === 'reset') {
        localStorage.clear();
        
        const navBox = document.querySelector('nav');
        navBox.innerHTML = '';
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = '';
        populate();
        iterateArray(projects, renderNavigationContent);
        getCurrentPage();

        // CLOSE DIALOG
        const dialog = document.querySelector('dialog');
        dialog.close();
        return;
    }
    const title = document.querySelector('form .title');
    const description = document.querySelector('form .description');
    const notes = document.querySelector('form .notes');
    const priority = document.querySelector('form .priority');
    const dueDate = document.querySelector('form .due-date');
    const dueTime = document.querySelector('form .due-time');

    if (checkTodo(title.value, 'Enter a title for the todo')) {
        return;
    }
    if (checkTodo(description.value, 'Enter text into the description box')) {
        return;
    }
    if (checkTodo(notes.value, 'Enter text into the notes box')) {
        return;
    }
    if (dateCheck(getCurrentDate(dueDate.value, dueTime.value, '-', ':'))) {
        return;
    }
    if (dropdownCheck(priority.value, 'Select a priority')) {
        return;
    }
    if (dialogElement.dataset.add === 'todo') {
        const button = document.querySelector('.todo-box [data-action]');
        dueDate.min = getDateOfThisMoment();
        dueTime.min = getTimeOfThisMoment();


        projects[Number(button.dataset.index)].array.push(new Todo(capitaliseFirstLetter(title.value), getCurrentDate(dueDate.value, dueTime.value, '-', ':'), capitaliseFirstLetter(description.value), priority.value, capitaliseFirstLetter(notes.value), dueDate.value, dueTime.value));
        pushToStorage('storage', projects);
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = '';
        iterateArray(projects[Number(button.dataset.index)].array, renderTodoContent);
        
        // CLOSE DIALOG
        const dialog = document.querySelector('dialog');
        dialog.close();
        return;
        
    }
    if (dialogElement.dataset.add === 'edit') {
        const button = document.querySelector('.todo-box [data-action]');
        const formButton = document.querySelector('.save');
        
        projects[Number(button.dataset.index)].array[formButton.dataset.editIndex] = new Todo(title.value, getCurrentDate(dueDate.value, dueTime.value, '-', ':'), description.value, priority.value, notes.value, dueDate.value, dueTime.value);
        
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = '';
        pushToStorage('storage', projects);
        iterateArray(projects[Number(button.dataset.index)].array, renderTodoContent);
        
        // CLOSE DIALOG
        const dialog = document.querySelector('dialog');
        dialog.close();
        return;
    }
}

function executeEnterClick(event) {
    if (event.key !== 'Enter') {
        return;
    }
    event.preventDefault();
}

function getAbout(event) {
    const aboutButton = event.target.closest('.about');
    if (!aboutButton) {
        return;
    }
    const dialog = document.querySelector('dialog');
    aboutThisProject();
    dialog.showModal();
}

export {executeNavigationBoxClick, executeDialogClick, executeTodoBoxClick, closeDialog, executeEnterClick, getAbout }