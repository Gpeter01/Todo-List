import './style.css'
import { projects } from './todo.js'
import { iterateArray, renderNavigationContent, renderTodoContent } from './ui-content.js'
import { executeNavigationBoxClick, executeTodoBoxClick, executeDialogClick, closeDialog, executeEnterClick } from './event.js';

const button = document.querySelector('.todo-box [data-action]');
button.dataset.index = '0';

// DISPLAY PROJECTS
iterateArray(projects, renderNavigationContent);

// DISPLAY TODOS
iterateArray(projects[0].array, renderTodoContent);

// ADD EVENT LISTENERS
const navigationBox = document.querySelector('.navigation-box');
navigationBox.addEventListener('click', executeNavigationBoxClick);
navigationBox.addEventListener('keydown', executeEnterClick);

const dialog = document.querySelector('dialog');
dialog.addEventListener('click', closeDialog);
dialog.addEventListener('keydown', executeEnterClick);
dialog.addEventListener('click', executeDialogClick);

const todoBox = document.querySelector('.todo-box');
todoBox.addEventListener('click', executeTodoBoxClick);
todoBox.addEventListener('keydown', executeEnterClick);

// DONE AND DUSTED, NOW LET'S SEE HOW IT GOES AND PLAN FROM THERE