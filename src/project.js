const projectFactory = () => {
    let title = '';
    let description = '';
    let isDefault = false;
    let todoList = [];
    const setTitle = (newTitle) => { projectObj.title = newTitle; };
    const setDescription = (newDescription) => { projectObj.description = newDescription; };
    const setDefault = (newDefault) => { projectObj.isDefault = newDefault; };
    const addTask = (newTask) => { projectObj.todoList.push(newTask); }
    const projectObj = { title, description, isDefault, todoList, setTitle, setDescription, setDefault, addTask };
    return projectObj;
};

export default projectFactory;