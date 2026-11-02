import './style.css'
import { projects } from './todo.js'
import { iterateArray, renderNavigationContent, getCurrentPage } from './ui-content.js'
import { executeNavigationBoxClick, executeTodoBoxClick, executeDialogClick, closeDialog, executeEnterClick, getAbout} from './event.js';

// DISPLAY PROJECTS
iterateArray(projects, renderNavigationContent);

getCurrentPage();

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

const header = document.querySelector('header');
header.addEventListener('click', getAbout)

// DONE AND DUSTED, NOW LET'S SEE HOW IT GOES AND PLAN FROM THERE