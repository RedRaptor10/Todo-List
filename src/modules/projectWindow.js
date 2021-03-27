import { loadProjectForm, loadTaskForm } from './form.js';
import { loadTask } from '../taskWindow.js';
import { saveProjects } from './storage.js';

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
        removeTaskButton.addEventListener('click', () => { removeTask(t, project, projects); });

        // On click, load task to task window
        task.addEventListener('click', () => { loadTask(t, project, projects); });

        task.append(taskTitle, taskProperties, removeTaskButton);
        todoList.appendChild(task);
    });

    main.append(projectTitle, editButton, projectDescription, tasksTitle, addTaskButton, todoList);
}

function removeTask(task, project, projects) {
    let taskWindow = document.getElementById('taskWindow');
    const index = project.todoList.indexOf(task);

    if (index > -1) { project.todoList.splice(index, 1); }

    taskWindow.innerHTML = '';
    loadTodoList(project, projects);

    saveProjects(projects); // Save projects
}

export { loadTodoList };