import { projectFactory } from './project.js';
import { taskFactory } from './task.js';
import { loadProjects } from './sidebar.js';
import { loadTodoList } from './projectWindow.js';
import { loadTask } from './taskWindow.js';
import { saveProjects } from './storage.js';

function loadProjectForm(action, project, projects) {
    let container = document.getElementById('container');
    let cover = document.createElement('div');
    cover.id = 'cover';
    cover.classList.add('cover');
    cover.addEventListener('click', () => {
        removeProjectForm(cover, projectForm);
    });
    container.appendChild(cover);

    // Fade in
    setTimeout(() => {
        cover.classList.add('backgroundFade');
    }, 100);

    // Project Form
    let projectForm = document.createElement('div');
    projectForm.setAttribute('class', 'projectForm');

    let formTitle = document.createElement('div');
    formTitle.id = 'formTitle';
    if (action == 'add') { formTitle.innerHTML = 'Add Project'; }
    else if (action == 'edit') { formTitle.innerHTML = 'Edit Project'; }
    projectForm.append(formTitle);

    // Title
    let titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'projectTitle');
    titleLabel.innerHTML = 'Title';
    let titleError = document.createElement('label');
    titleError.setAttribute('class', 'errorMessage');
    let titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.id = 'titleInput';
    if (action == 'edit') { titleInput.value = project.title; }
    projectForm.append(titleLabel, titleError, titleInput);

    // Description
    let descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'projectDescription');
    descriptionLabel.innerHTML = 'Description';
    let descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.id = 'descriptionInput';
    if (action == 'edit') { descriptionInput.value = project.description; }
    projectForm.append(descriptionLabel, descriptionInput);

    // Default
    let defaultLabel = document.createElement('label');
    defaultLabel.setAttribute('for', 'projectDefault');
    defaultLabel.id = 'defaultLabel';
    defaultLabel.innerHTML = 'Default';
    let defaultCheckbox = document.createElement('input');
    defaultCheckbox.setAttribute('type','checkbox');
    defaultCheckbox.id = 'defaultCheckbox';
    projectForm.append(defaultLabel, defaultCheckbox);

    // Save Button
    let saveButton = document.createElement('div');
    saveButton.id = 'saveButton';
    saveButton.innerHTML = 'Save';
    saveButton.addEventListener('click', () => {
        let title = document.getElementById('titleInput').value;
        let description = document.getElementById('descriptionInput').value;
        let defaultValue = document.getElementById('defaultCheckbox').value;

        if (!title) { titleError.innerHTML = '* Title required.';
        } else {
            // Unset all project default values
            if (defaultValue) {
                projects.forEach((p) => {
                    p.setDefault(false);
                });
            }
            if (action == 'add') {
                let newProject = projectFactory();

                newProject.setTitle(title);
                newProject.setDescription(description);
                newProject.setDefault(defaultValue);
                projects.push(newProject);
            } else if (action == 'edit') {
                project.setTitle(title);
                project.setDefault(defaultValue);
                project.setDescription(description);
                loadTodoList(project, projects);
            }

            loadProjects(projects, false);
            removeProjectForm(cover, projectForm);

            // Save Projects
            saveProjects(projects);
        }
    });
    projectForm.appendChild(saveButton);

    container.appendChild(projectForm);

    // Fade in
    setTimeout(() => {
        projectForm.classList.add('projectFormFade');
    }, 100);
}

function loadTaskForm(action, task, project, projects) {
    let container = document.getElementById('container');
    let cover = document.createElement('div');
    cover.id = 'cover';
    cover.classList.add('cover');
    cover.addEventListener('click', () => {
        removeTaskForm(cover, taskForm);
    });
    container.appendChild(cover);

    // Fade in
    setTimeout(() => {
        cover.classList.add('backgroundFade');
    }, 100);

    // Task Form
    let taskForm = document.createElement('div');
    taskForm.setAttribute('class', 'taskForm');

    let formTitle = document.createElement('div');
    formTitle.id = 'formTitle';
    if (action == 'add') { formTitle.innerHTML = 'Add Task'; }
    else if (action == 'edit') { formTitle.innerHTML = 'Edit Task'; }
    taskForm.append(formTitle);

    // Title
    let titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'taskTitle');
    titleLabel.innerHTML = 'Title';
    let titleError = document.createElement('label');
    titleError.setAttribute('class', 'errorMessage');
    let titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.id = 'titleInput';
    if (action == 'edit') { titleInput.value = task.title; }
    taskForm.append(titleLabel, titleError, titleInput);

    // Due Date
    let dueDateLabel = document.createElement('label');
    dueDateLabel.setAttribute('for', 'taskDueDate');
    dueDateLabel.innerHTML = 'Due Date';
    let dueDateInput = document.createElement('input');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.id = 'dueDateInput';
    dueDateInput.valueAsDate = new Date();
    if (action == 'edit') { dueDateInput.value = task.dueDate; }
    taskForm.append(dueDateLabel, dueDateInput);

    // Priority
    let priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'taskPriority');
    priorityLabel.innerHTML = 'Priority';
    let prioritySelect = document.createElement('select');
    prioritySelect.setAttribute('name', 'priority');
    prioritySelect.id = 'prioritySelect';
    let priorityLow = document.createElement('option');
    priorityLow.value = 'Low';
    priorityLow.innerHTML = 'Low';
    let priorityMid = document.createElement('option');
    priorityMid.value = 'Mid';
    priorityMid.innerHTML = 'Mid';
    let priorityHigh = document.createElement('option');
    priorityHigh.value = 'High';
    priorityHigh.innerHTML = 'High';
    prioritySelect.append(priorityLow, priorityMid, priorityHigh);
    if (action == 'edit') { prioritySelect.value = task.priority; }
    taskForm.append(priorityLabel, prioritySelect);

    // Description
    let descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'taskDescription');
    descriptionLabel.innerHTML = 'Description';
    let descriptionInput = document.createElement('textarea');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.id = 'descriptionInput';
    if (action == 'edit') { descriptionInput.value = task.description; }
    taskForm.append(descriptionLabel, descriptionInput);

    // Notes
    let notesLabel = document.createElement('label');
    notesLabel.setAttribute('for', 'taskNotes');
    notesLabel.innerHTML = 'Notes';
    let notesInput = document.createElement('textarea');
    notesInput.setAttribute('type', 'text');
    notesInput.id = 'notesInput';
    if (action == 'edit') { notesInput.value = task.notes; }
    taskForm.append(notesLabel, notesInput);

    // Save Button
    let saveButton = document.createElement('div');
    saveButton.id = 'saveButton';
    saveButton.innerHTML = 'Save';
    saveButton.addEventListener('click', () => {
        let title = document.getElementById('titleInput').value;
        let dueDate = document.getElementById('dueDateInput').value;
        let priority = document.getElementById('prioritySelect').value;
        let description = document.getElementById('descriptionInput').value;
        let notes = document.getElementById('notesInput').value;

        if (!title) { titleError.innerHTML = '* Title required.';
        } else {
            if (action == 'add') {
                let newTask = taskFactory();
                newTask.setTitle(title);
                newTask.setDueDate(dueDate);
                newTask.setPriority(priority);
                newTask.setDescription(description);
                newTask.setNotes(notes);

                project.todoList.push(newTask);
            } else if (action == 'edit') {
                task.setTitle(title);
                task.setDueDate(dueDate);
                task.setPriority(priority);
                task.setDescription(description);
                task.setNotes(notes);
                loadTask(task, project, projects);
            }

            loadTodoList(project, projects);
            removeTaskForm(cover, taskForm);

            // Save projects
            saveProjects(projects);
        }
    });
    taskForm.appendChild(saveButton);

    container.appendChild(taskForm);

    // Fade in
    setTimeout(() => {
        taskForm.classList.add('taskFormFade');
    }, 100);
}

function removeProjectForm(cover, projectForm) {
    setTimeout(() => {
        cover.classList.remove('backgroundFade');
        projectForm.classList.remove('projectFormFade');
        setTimeout(() => {
            projectForm.remove();
            cover.remove();
        }, 500);
    }, 100);
}

function removeTaskForm(cover, taskForm) {
    setTimeout(() => {
        cover.classList.remove('backgroundFade');
        taskForm.classList.remove('taskFormFade');
        setTimeout(() => {
            taskForm.remove();
            cover.remove();
        }, 500);
    }, 100);
}

export { loadProjectForm, loadTaskForm, removeProjectForm, removeTaskForm };