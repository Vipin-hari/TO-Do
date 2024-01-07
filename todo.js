document.addEventListener('DOMContentLoaded', () => {

    const tasks = JSON.parse(localStorage.getItem('tasks')) || { todo: [], done: [] };
    displayTasks();

    window.addTask = function () {
        const taskInput = document.getElementById('taskInput');
        const newTask = taskInput.value.trim();

        if (newTask !== '') {
            tasks.todo.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            displayTasks();
        }
    };

    function displayTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.todo.forEach((task, index) => {
            const taskElement = createTaskElement(task, index, 'todo');
            taskList.appendChild(taskElement);
        });

        tasks.done.forEach((task, index) => {
            const taskElement = createTaskElement(task, index, 'done');
            taskList.appendChild(taskElement);
        });
    }
    function createTaskElement(task, index, status) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('tasks');

        const taskParagraph = document.createElement('p');
        taskParagraph.textContent = task;
        taskParagraph.classList.add(status);
        taskElement.appendChild(taskParagraph);

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash');
        trashIcon.addEventListener('click', (event) => removeTask(event, index, status));
        taskParagraph.appendChild(trashIcon);
        taskParagraph.addEventListener('click', () => toggleTaskStatus(index, status));

        return taskElement;
    }
    function toggleTaskStatus(index, status) {
        const task = tasks[status].splice(index, 1)[0];
        const newStatus = status === 'todo' ? 'done' : 'todo';
        tasks[newStatus].push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
    function removeTask(event, index, status) {
        event.stopPropagation(); 
        tasks[status].splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }
});
