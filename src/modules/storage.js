import { projectFactory } from './project.js';
import { taskFactory } from './task.js';
import { loadSidebar } from './sidebar.js';

function loadProjects() {
    let projects = [];

    if (localStorage.getItem('projects')) {
        projects = JSON.parse(localStorage.getItem('projects'));
    } else {
        let emptyProject = projectFactory();
        emptyProject.setTitle('My Project');

        let emptyTask = taskFactory();
        emptyTask.setTitle('My Task');

        emptyProject.addTask(emptyTask);
        projects.push(emptyProject);
    }

    loadSidebar(projects);
}

function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));

    // If projects is empty, clear local storage
    if (projects.length == 0) { localStorage.clear(); }
}

export { loadProjects, saveProjects };