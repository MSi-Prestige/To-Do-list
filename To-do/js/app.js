"use strict";


//TODO: Select the Elements.
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//TODO: Class name.

const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrought = "lineThrough";

//TODO: Variables
let listVariables;
let id;
//TODO: Local storage.

let data = localStorage.getItem("taskTodo");

//TODO: empty or not.
if (data) {
    listVariables = JSON.parse(data);
    id = listVariables.length;
    loadList(listVariables);
} else {
    listVariables = [];
    id = 0;
}
//TODO: load storage to UI.
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//TODO: clear storage.
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

//TODO: Date.
const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
};

const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);


function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? check : uncheck;
    const LINE = done ? lineThrough : "";
    const item = `
    <li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
    // beforebegin , afterbegin, beforeend, afterend. position create To-Do
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);

}

// Press Enter button - code key 13.
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        //if no empty
        if (toDo) {
            addToDo(toDo, id, false, false);
            listVariables.push({
                name: toDo,
                id: id,
                done: false,
                trash: false,
            });
            localStorage.setItem("taskTOdo", JSON.stringify(listVariables));
            id++;
        }
        input.value = "";
    }
});

// Complete taks
function completeTask(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrought);
    listVariables[element.id].done = listVariables[element.id].done ? false : true;
}

// Delete Taks.
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listVariables[element.id].trash = true;
}

// create dynamic
list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        completeTask(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    localStorage.setItem("taskTOdo", JSON.stringify(listVariables));
});