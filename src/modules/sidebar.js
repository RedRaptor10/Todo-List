import { loadTodoList } from './projectWindow.js';
import { loadProjectForm } from './form.js';
import { saveProjects } from './storage.js';

function loadSidebar(projects) {
    let sidebar = document.getElementById('sidebar');
    let addProjectButton = document.getElementById('addProjectButton');

    addProjectButton.addEventListener('click', () => {
        let action = 'add';
        loadProjectForm(action, null, projects);
    });

    loadProjects(projects, true);
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
        removeProjectButton.addEventListener('click', () => { removeProject(p, projects); });

        // Load default project to main on startup
        if (startup && p.isDefault) { loadTodoList(p, projects); }

        // On click, load project to main
        projectTitle.addEventListener('click', () => { loadTodoList(p, projects); });

        project.appendChild(projectTitle);
        project.appendChild(removeProjectButton);
        projectsContainer.appendChild(project);
    });
}

function removeProject(project, projects) {
    let main = document.getElementById('main');
    const index = projects.indexOf(project);

    if (index > -1) { projects.splice(index, 1); }

    main.innerHTML = '';
    loadProjects(projects, false);

    saveProjects(projects); // Save projects
}

export { loadSidebar, loadProjects };