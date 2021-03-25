function loadHeader() {
    let header = document.getElementById('header');
    let title = document.createElement('div');
    title.id = 'title';

    title.innerHTML = 'Todo List';
    title.addEventListener('click', () => {
        location.reload();
    });

    header.appendChild(title);
}

export default loadHeader;