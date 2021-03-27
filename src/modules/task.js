const taskFactory = () => {
    let title = '';
    let description = '';
    let dueDate = '2021-01-01';
    let priority = 'Low';
    let notes = '';
    let status = false;
    const setTitle = (newTitle) => { taskObj.title = newTitle; };
    const setDescription = (newDescription) => { taskObj.description = newDescription; };
    const setDueDate = (newDueDate) => { taskObj.dueDate = newDueDate; };
    const setPriority = (newPriority) => { taskObj.priority = newPriority; };
    const setNotes = (newNotes) => { taskObj.notes = newNotes; };
    const setStatus = (newStatus) => { taskObj.status = newStatus; };
    const taskObj = { title, description, dueDate, priority, notes, status,
        setTitle, setDescription, setDueDate, setPriority, setNotes, setStatus };
    return taskObj;
};

export { taskFactory };