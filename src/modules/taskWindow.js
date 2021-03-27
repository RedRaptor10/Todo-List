import { loadTaskForm } from './form.js';

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

export { loadTask };