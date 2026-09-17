let title=document.getElementById("title");
title.textContent = "My Daily Tasks";

let tasks = document.getElementsByClassName("task");
tasks[0].style.color = "red";

let paragraphs = document.getElementsByTagName("p");
paragraphs[1].style.color = "blue";

let Title=document.querySelector("#title");
Title.style.fontFamily="Georgia";

let task=document.querySelectorAll(".task");
task.forEach(item => item.style.fontFamily = "Times New Roman");

let newTask = document.createElement("p");
newTask.textContent="learn DOM";
newTask.style.fontFamily="Times New Roman";
let tasklist=document.querySelector("#taskList");
tasklist.appendChild(newTask);