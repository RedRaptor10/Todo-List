function initialize(projects) {
    // Container
    let container = document.getElementById('container');

    // Header
    let header = document.createElement('div');
    header.id = 'header';

    // Sidebar
    let sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    let sidebarTitle = document.createElement('div');
    sidebarTitle.id = 'sidebarTitle';
    sidebarTitle.innerHTML = 'Projects';
    sidebar.appendChild(sidebarTitle);

    let addProjectButton = document.createElement('div');
    addProjectButton.id = 'addProjectButton';
    addProjectButton.innerHTML = '+';
    sidebar.appendChild(addProjectButton);

    let projectsContainer = document.createElement('div');
    projectsContainer.id = 'projectsContainer';
    sidebar.appendChild(projectsContainer);

    // Main
    let main = document.createElement('div');
    main.id = 'main';

    // Task Window
    let taskWindow = document.createElement('div');
    taskWindow.id = 'taskWindow';

    container.append(header, sidebar, main, taskWindow);
}

export default initialize;