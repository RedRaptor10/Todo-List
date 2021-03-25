import initialize from './initialize.js';
import loadHeader from './header.js';
import projectFactory from './project.js';
import taskFactory from './task.js';
import loadSidebar from './sidebar.js';

// Test Project & Task
let emptyProject = projectFactory();
emptyProject.setTitle('My Project');
emptyProject.setDescription('');
emptyProject.setDefault(true);

let emptyTask = taskFactory();
emptyTask.setTitle('My Task');
emptyTask.setDescription('');
emptyTask.setDueDate('2021-01-01');
emptyTask.setPriority('Low');
emptyTask.setNotes('');
emptyTask.setStatus(false);

emptyProject.addTask(emptyTask);
let projects = [emptyProject];

initialize(projects);
loadHeader();
loadSidebar(projects);