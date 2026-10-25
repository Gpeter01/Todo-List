import './style.css'
import { projects } from './todo.js'
import { iterateArray, renderNavigationContent, renderTodoContent } from './ui-content.js'

// DISPLAY PROJECTS
iterateArray(projects, renderNavigationContent);

// DISPLAY TODOS
iterateArray(projects[0].array, renderTodoContent);

// DONE AND DUSTED, NOW LET'S SEE HOW IT GOES AND PLAN FROM THERE