let input = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

input.addEventListener("keypress", function(e){
if(e.key === "Enter"){
addTask();
}
});

function addTask(){

let task = input.value.trim();

if(task === "") return;

let tasks = getTasks();

tasks.push({text:task,completed:false});

localStorage.setItem("tasks",JSON.stringify(tasks));

input.value="";

loadTasks();

}

function loadTasks(){

taskList.innerHTML="";

let tasks = getTasks();

tasks.forEach((task,index)=>{

let li = document.createElement("li");

if(task.completed){
li.classList.add("completed");
}

li.innerHTML=`

<span onclick="toggleTask(${index})">${task.text}</span>

<button class="delete-btn" onclick="deleteTask(${index})">X</button>

`;

taskList.appendChild(li);

});

}

function toggleTask(index){

let tasks = getTasks();

tasks[index].completed = !tasks[index].completed;

localStorage.setItem("tasks",JSON.stringify(tasks));

loadTasks();

}

function deleteTask(index){

let tasks = getTasks();

tasks.splice(index,1);

localStorage.setItem("tasks",JSON.stringify(tasks));

loadTasks();

}

function getTasks(){

return JSON.parse(localStorage.getItem("tasks")) || [];

}