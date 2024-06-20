let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoItemsList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoItemsList = getTodoListFromLocalStorage();
let todosCount = todoItemsList.length;


saveTodoButton.onclick = function() {
    localStorage.setItem("todoItemsList", JSON.stringify(todoItemsList));
}

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount = todosCount + 1;

    let newTodo = {
        text: userInputValue,
        id: todosCount,
        ischecked: false
    };
    todoItemsList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxEl = document.getElementById(checkboxId);
    let labelEl = document.getElementById(labelId);
    labelEl.classList.toggle("checked");

    let todoitemindex = todoItemsList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.id;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoobject = todoItemsList[todoitemindex];
    if (todoobject.ischecked === true) {
        todoobject.ischecked = false;
    } else {
        todoobject.ischecked = true;
    }


}


function dltLabel(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);


    let dltItemindex = todoItemsList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.id;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoItemsList.splice(dltItemindex, 1);
}


function createAndAppendTodo(todo) {
    let todoId = 'todo' + todo.id;
    let checkboxId = 'checkbox' + todo.id;
    let labelId = 'label' + todo.id;


    let todoEl = document.createElement('li');
    todoEl.id = todoId;
    todoEl.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoEl);


    let checkboxEl = document.createElement("input");
    checkboxEl.id = checkboxId;
    checkboxEl.type = "checkbox";
    checkboxEl.checked = todo.ischecked;


    checkboxEl.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };


    checkboxEl.classList.add("checkbox-input");
    todoEl.appendChild(checkboxEl);


    let labelcontainer = document.createElement("div");
    labelcontainer.classList.add("label-container", "d-flex", "flex-row");
    todoEl.appendChild(labelcontainer);


    let labelEl = document.createElement("label");
    labelEl.setAttribute('for', checkboxId);
    labelEl.id = labelId;
    labelEl.classList.add("checkbox-label");
    labelEl.textContent = todo.text;
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelcontainer.appendChild(labelEl);


    let dltIconContainer = document.createElement("div");
    dltIconContainer.classList.add("delete-icon-container");
    labelcontainer.appendChild(dltIconContainer);


    let dltIcon = document.createElement("i");
    dltIcon.classList.add("far", "fa-trash-alt", "delete-icon");


    dltIcon.onclick = function() {
        dltLabel(todoId);
    };


    dltIconContainer.appendChild(dltIcon);


}


for (let todo of todoItemsList) {
    createAndAppendTodo(todo);
}