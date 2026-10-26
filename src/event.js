import { createProjectFormDisplay, createTodoFormDisplay, renderTodoContent, renderNavigationContent, iterateArray } from "./ui-content.js";
import { projects, svgArray, TodoList, Todo } from "./todo.js";

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
        todoContainer.innerHTML = '';
        iterateArray(projects[index].array, renderTodoContent);
        return;
    }
}

function executeTodoBoxClick(event) {
    const button = event.target.closest('[data-action]');
    if (button) {
        const dialog = document.querySelector('dialog');
        dialog.showModal();
        createTodoFormDisplay();
        return;
    }
}

function executeDialogClick(event) {
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
        iterateArray(projects, renderNavigationContent);

        // CLOSE DIALOG
        const dialog = document.querySelector('dialog');
        dialog.close();

    }
}

export {executeNavigationBoxClick, executeDialogClick, executeTodoBoxClick }