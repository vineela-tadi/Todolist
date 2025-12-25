let tasks = [];
document.addEventListener("DOMContentLoaded", ()=>
{
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  if(storedTasks){
     tasks = storedTasks;
    updateTasksList();
    updateStats();
  }
  
  document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
  });
});
 const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
 };
const addTask = () => {
  const taskInput = document.getElementById('taskInput');
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    taskInput.value = " "; // clear input
    updateTasksList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};
const editTask = (index) => {
  const taskInput = document.getElementById('taskInput');
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};
const updateStats = ()=>{
  const completeTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? ( completeTasks / totalTasks )*100 : 0;
   document.getElementById('progress').style.width = `${progress}%`;
  document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
};

const updateTasksList = () => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.className = "taskItem";

    listItem.innerHTML = `
        <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskComplete(${index})" />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="edit.png" onclick="editTask(${index})"/>
          <img src="trash.png" onclick="deleteTask(${index})"/>
        </div>
    `;
    taskList.appendChild(listItem);
  });

 };
