function loadProjects(projects) {
    if (localStorage.getItem('projects')) {
        projects = JSON.parse(localStorage.getItem('projects'));
    }
}

function saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));

    // If projects is empty, clear local storage
    if (projects.length == 0) { localStorage.clear(); }
}

export { loadProjects, saveProjects };