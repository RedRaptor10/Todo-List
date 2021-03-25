import initialize from './initialize.js';
import loadHeader from './header.js';
import projectFactory from './project.js';
import taskFactory from './task.js';
import loadSidebar from './sidebar.js';

loadProjects();
initialize(projects);
loadHeader();
loadSidebar(projects);

function loadProjects() {
    let projects;

    // If local storage is not empty, load projects from local storage
    if (localStorage.getItem('projects')) {
        projects = JSON.parse(localStorage.getItem('projects'));
    } else {
        // Initial Project & Task
        let emptyProject = projectFactory();
        emptyProject.setTitle('My Project');

        let emptyTask = taskFactory();
        emptyTask.setTitle('My Task');

        emptyProject.addTask(emptyTask);
        projects = [emptyProject];
    }
}