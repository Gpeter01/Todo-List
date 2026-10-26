import { createProjectFormDisplay, createTodoFormDisplay, renderTodoContent, iterateArray } from "./ui-content.js";
import { projects } from "./todo.js";

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
    
}

export {executeNavigationBoxClick, executeDialogClick, executeTodoBoxClick }