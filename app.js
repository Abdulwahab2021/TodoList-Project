const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todolist = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

filterOption.addEventListener("click", filterTodo);
todoButton.addEventListener("click", addTodo);
todolist.addEventListener("click", deletecheck);
document.addEventListener("DOMContentLoaded", gettodos);
function deletecheck(event) {

    const item = event.target;
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);  
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
       
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
   
}
function filterTodo(e) {
    const todos = todolist.childNodes;
  
    todos.forEach(function (todo) { 
        switch (e.target.value) {
            case "All":
                todo.style.display = "flex";
                break
                
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }

                break;

            case "UnCompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            
            
            }
       

    })
}
function addTodo(event) {
    event.preventDefault();
    //creat todo div
const tododiv = document.createElement("div");
tododiv.classList.add("todo");

//create li
const newtodo = document.createElement("li");
    newtodo.innerText = todoInput.value;
    saveLocalTodos(todoInput.value);

newtodo.classList.add("todo-item");
tododiv.appendChild(newtodo);

//ccreate MArk button

const compeletebutton = document.createElement("button");
compeletebutton.innerHTML = '<i class="fas fa-check"></i>';
compeletebutton.classList.add("complete-btn");
tododiv.appendChild(compeletebutton);

//ccreate trash button

const  Trashbutton = document.createElement("button");
Trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
Trashbutton.classList.add("trash-btn");
tododiv.appendChild(Trashbutton);

todolist.appendChild(tododiv);
    todoInput.value = "";
}
//create div


function saveLocalTodos(todo) {
   
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos=[];
    }
    else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
   
    localStorage.setItem("todos", JSON.stringify(todos));
  
}
  
function gettodos() {
    
    let todos;
    if (localStorage.getItem("todos") == null) {
        todos = [];
    }
    else {
        todos=JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {

        //creat todo div
        const tododiv = document.createElement("div");
        tododiv.classList.add("todo");

        //create li
        const newtodo = document.createElement("li");
        newtodo.innerText = todo;
    

        newtodo.classList.add("todo-item");
        tododiv.appendChild(newtodo);

        //ccreate MArk button

        const compeletebutton = document.createElement("button");
        compeletebutton.innerHTML = '<i class="fas fa-check"></i>';
        compeletebutton.classList.add("complete-btn");
        tododiv.appendChild(compeletebutton);

        //ccreate trash button

        const Trashbutton = document.createElement("button");
        Trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
        Trashbutton.classList.add("trash-btn");
        tododiv.appendChild(Trashbutton);
         
        todolist.appendChild(tododiv);
    });

    

}

function removeLocalTodos(todo) {

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1)
    localStorage.setItem("todos",JSON.stringify(todos));

    


}


 
