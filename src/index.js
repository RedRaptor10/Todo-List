import { projectFactory } from './modules/project.js';
import { taskFactory } from './modules/task.js';
import { initialize } from './modules/initialize.js';
import { loadSidebar } from './modules/sidebar.js';
import { loadProjects } from './modules/storage.js';

let projects = [];

loadProjects(projects);

if (projects.length == 0) {
    let emptyProject = projectFactory();
    emptyProject.setTitle('My Project');

    let emptyTask = taskFactory();
    emptyTask.setTitle('My Task');

    emptyProject.addTask(emptyTask);
    projects.push(emptyProject);
}

initialize();
loadSidebar(projects);