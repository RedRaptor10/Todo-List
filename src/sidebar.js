import projectFactory from './project.js';
import taskFactory from './task.js';

function loadSidebar(projects) {
    let sidebar = document.getElementById('sidebar');
    let addProjectButton = document.getElementById('addProjectButton');

    addProjectButton.addEventListener('click', () => {
        let action = 'add';
        loadProjectForm(action, null, projects);
    });

    loadProjects(projects, true);
}

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

function removeProject(project, projects) {
    let main = document.getElementById('main');
    const index = projects.indexOf(project);

    if (index > -1) { projects.splice(index, 1); }

    main.innerHTML = '';
    loadProjects(projects, false);

    // Save projects
    saveProjects(projects);

    // If projects is empty, clear local storage
    if (projects.length == 0) { localStorage.clear(); }
}

function loadProjects(projects, startup) {
    let sidebar = document.getElementById('sidebar');
    let projectsContainer = document.getElementById('projectsContainer');
    let main = document.getElementById('main');

    projectsContainer.innerHTML = '';

    projects.forEach((p, index) => {
        let project = document.createElement('div');
        project.setAttribute('class', 'project');

        // If project is last, add border bottom
        if (index == projects.length - 1) {
            project.classList.add('projectLast');
        }

        // Project Title
        let projectTitle = document.createElement('div');
        projectTitle.setAttribute('class', 'projectTitle');
        projectTitle.innerHTML = p.title;

        // Remove Project Button
        let removeProjectButton = document.createElement('div');
        removeProjectButton.setAttribute('class', 'removeProjectButton');
        removeProjectButton.innerHTML = '-';
        removeProjectButton.addEventListener('click', () => {
            removeProject(p, projects);
        });

        // Load default project to main on startup
        if (startup && p.isDefault) { loadTodoList(p, projects); }

        // On click, load project to main
        projectTitle.addEventListener('click', () => { loadTodoList(p, projects); });

        project.appendChild(projectTitle);
        project.appendChild(removeProjectButton);
        projectsContainer.appendChild(project);
    });
}

function loadTodoList(project, projects) {
    let main = document.getElementById('main');
    main.innerHTML = '';

    // Project Title
    let projectTitle = document.createElement('div');
    projectTitle.id = 'projectTitle';
    projectTitle.innerHTML = project.title;

    // Edit Button
    let editButton = document.createElement('div');
    editButton.setAttribute('class', 'editButton');
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', () => {
        let action = 'edit';
        loadProjectForm(action, project, projects);
    });

    // Project Description
    let projectDescription = document.createElement('div');
    projectDescription.id = 'projectDescription';
    projectDescription.innerHTML = project.description;

    // Tasks Title
    let tasksTitle = document.createElement('div');
    tasksTitle.id = 'tasksTitle';
    tasksTitle.innerHTML = 'Tasks';

    // Add Task Button
    let addTaskButton = document.createElement('div');
    addTaskButton.id = 'addTaskButton';
    addTaskButton.innerHTML = '+';
    addTaskButton.addEventListener('click', () => {
        let action = 'add';
        loadTaskForm(action, null, project, projects);
    });

    // Todo List
    let todoList = document.createElement('div');
    todoList.id = 'todoList';

    let listHeader = document.createElement('div');
    listHeader.id = 'listHeader';

    let listHeaderTitle = document.createElement('div');
    listHeaderTitle.id = 'listHeaderTitle';
    listHeaderTitle.innerHTML = 'Name';

    let listHeaderProperties = document.createElement('div');
    listHeaderProperties.id = 'listHeaderProperties';

    let listHeaderDueDate = document.createElement('div');
    listHeaderDueDate.id = 'listHeaderDueDate';
    listHeaderDueDate.innerHTML = 'Due Date';

    let listHeaderPriority = document.createElement('div');
    listHeaderPriority.id = 'listHeaderPriority';
    listHeaderPriority.innerHTML = 'Priority';

    let listHeaderStatus = document.createElement('div');
    listHeaderStatus.id = 'listHeaderStatus';
    listHeaderStatus.innerHTML = 'Status';

    listHeaderProperties.append(listHeaderDueDate, listHeaderPriority, listHeaderStatus);
    listHeader.append(listHeaderTitle, listHeaderProperties);
    todoList.append(listHeader);

    project.todoList.forEach((t, index) => {
        let task = document.createElement('div');
        task.setAttribute('class', 'task');

        let taskTitle = document.createElement('div');
        taskTitle.setAttribute('class', 'taskTitle');
        taskTitle.innerHTML = (index + 1) + '. ' + t.title;

        let taskProperties = document.createElement('div');
        taskProperties.setAttribute('class', 'taskProperties');

        let taskDueDate = document.createElement('div');
        taskDueDate.setAttribute('class', 'taskDueDate');
        taskDueDate.innerHTML = t.dueDate;

        let taskPriority = document.createElement('div');
        taskPriority.setAttribute('class', 'taskPriority');
        taskPriority.innerHTML = t.priority;

        let taskStatus = document.createElement('div');
        taskStatus.setAttribute('class', 'taskStatus');
        taskStatus.innerHTML = t.status ? 'Complete' : 'Incomplete';
        taskStatus.style.color = t.status ? 'rgb(0,255,0)' : 'rgb(255,0,0)';

        taskStatus.addEventListener('mouseenter', () => {
            taskStatus.style.textDecoration = 'underline';
        });
        taskStatus.addEventListener('mouseleave', () => {
            taskStatus.style.textDecoration = 'unset';
        });

        // Set Status
        taskStatus.addEventListener('click', () => {
            let newStatus = t.status ? false : true;
            t.setStatus(newStatus);
            taskStatus.innerHTML = t.status ? 'Complete' : 'Incomplete';
            loadTodoList(project, projects);
        })

        taskProperties.append(taskDueDate, taskPriority, taskStatus);

        // Remove Task Button
        let removeTaskButton = document.createElement('div');
        removeTaskButton.setAttribute('class', 'removeTaskButton');
        removeTaskButton.innerHTML = '-';
        removeTaskButton.addEventListener('click', () => {
            removeTask(t, project, projects);
        });

        // On click, load task to task window
        task.addEventListener('click', () => { loadTask(t, project, projects); });

        task.append(taskTitle, taskProperties, removeTaskButton);
        todoList.appendChild(task);
    });

    main.append(projectTitle, editButton, projectDescription, tasksTitle, addTaskButton, todoList);
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
    notesLabel.innerHTML = 'notes';
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

function removeTask(task, project, projects) {
    let taskWindow = document.getElementById('taskWindow');
    const index = project.todoList.indexOf(task);

    if (index > -1) { project.todoList.splice(index, 1); }

    taskWindow.innerHTML = '';
    loadTodoList(project, projects);

    // Save projects
    saveProjects(projects);

    // If projects is empty, clear local storage
    if (projects.length == 0) { localStorage.clear(); }
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

function loadTask(task, project, projects) {
    let taskWindow = document.getElementById('taskWindow');
    taskWindow.innerHTML = '';

    // Task Title
    let taskTitle = document.createElement('div');
    taskTitle.id = 'taskTitle';
    taskTitle.innerHTML = task.title;

    // Edit Button
    let editButton = document.createElement('div');
    editButton.setAttribute('class', 'editButton');
    editButton.innerHTML = 'Edit';
    editButton.addEventListener('click', () => {
        let action = 'edit';
        loadTaskForm(action, task, project, projects);
    });

    // Task Due Date
    let taskDueDate = document.createElement('div');
    taskDueDate.id = 'taskDueDate';
    let taskDueDateLabel = document.createElement('span');
    taskDueDateLabel.setAttribute('class', 'taskLabel');
    taskDueDateLabel.innerHTML = 'Due Date: ';
    let taskDueDateValue = document.createElement('span');
    taskDueDateValue.innerHTML = task.dueDate;
    taskDueDate.append(taskDueDateLabel, taskDueDateValue);

    // Task Priority
    let taskPriority = document.createElement('div');
    taskPriority.id = 'taskPriority';
    let taskPriorityLabel = document.createElement('span');
    taskPriorityLabel.setAttribute('class', 'taskLabel');
    taskPriorityLabel.innerHTML = 'Priority: ';
    let taskPriorityValue = document.createElement('span');
    taskPriorityValue.innerHTML = task.priority;
    taskPriority.append(taskPriorityLabel, taskPriorityValue);

    // Task Status
    let taskStatus = document.createElement('div');
    taskStatus.id = 'taskStatus';
    let taskStatusLabel = document.createElement('span');
    taskStatusLabel.setAttribute('class', 'taskLabel');
    taskStatusLabel.innerHTML = 'Status: ';
    let taskStatusValue = document.createElement('span');
    taskStatusValue.innerHTML = task.status ? 'Complete' : 'Incomplete';
    taskStatusValue.style.color = task.status ? 'rgb(0,255,0)' : 'rgb(255,0,0)';
    taskStatus.append(taskStatusLabel, taskStatusValue);

    // Task Description
    let taskDescription = document.createElement('div');
    taskDescription.id = 'taskDescription';
    taskDescription.innerHTML = task.description;

    // Task Notes
    let taskNotes = document.createElement('div');
    taskNotes.id = 'taskNotes';
    let taskNotesLabel = document.createElement('span');
    taskNotesLabel.setAttribute('class', 'taskLabel');
    taskNotesLabel.innerHTML = 'Notes:<br />';
    let taskNotesValue = document.createElement('span');
    taskNotesValue.innerHTML = task.notes;
    taskNotes.append(taskNotesLabel, taskNotesValue);

    taskWindow.append(taskTitle, editButton, taskDueDate, taskPriority,
        taskStatus, taskDescription, taskNotes);
}

function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
}

export default loadSidebar;