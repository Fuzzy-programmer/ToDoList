// Selectors
const todoinput= document.querySelector('.todo-input')
const todobtn= document.querySelector('.todo-button')
const todoList= document.querySelector('.todo-list')
const filter=document.querySelector('.filter-todo')
// const editbtn=document.querySelector('.editbtn')

// Event Listners
document.addEventListener('DOMContentLoaded', gettodos)
todobtn.addEventListener('click', addtotdo)
todoList.addEventListener('click', deleteCheck)
filter.addEventListener('click', filterTodo)
// editbtn.addEventListener('click', editcontent)
todoList.removeChild(todoList.firstChild)

// Functions
function addtotdo(event){
    // Prevent form from submiting
    event.preventDefault()
    // todo div
    const tododiv=document.createElement('div')
    tododiv.classList.add('todo')
    tododiv.innerHTML=`<li class='todo-item'>${todoinput.value}</li>
    <button class='checkbtn'><i class="fas fa-check"></i></button>
    <button class="editbtn"><i class="fas fa-edit"></i></button>
    <button class="trbtn"><i class="fas fa-trash"></i></button>`
    // // create li
    // const newtodo=document.createElement('li')
    // newtodo.innerText=todoinput.value
    // newtodo.classList.add('todo-item')
    // tododiv.appendChild(newtodo)
    // // check button
    // const completebtn=document.createElement('button')
    // completebtn.innerHTML='<i class="fas fa-check"></i>'
    // completebtn.classList.add('checkbtn')
    // tododiv.appendChild(completebtn)
    // // trash button
    // const trashbtn=document.createElement('button')
    // trashbtn.innerHTML='<i class="fas fa-trash"></i>'
    // trashbtn.classList.add('trbtn')
    // tododiv.appendChild(trashbtn)
    // // appedn to todolist class
    if(todoinput.value!=''){
    storetodo(todoinput.value)
    todoList.appendChild(tododiv)}
    else
    alert('Enter a todo')
    // // clear input todo value
    todoinput.value=''
}

// delete
function deleteCheck(event){
    // console.log(event.target)
    const item=event.target
    // delete todo
    if(item.classList[0]==='trbtn'){
        const todo=item.parentElement
        // animation
        todo.classList.add('fall')
        remmovelocaltodos(todo)
        todo.addEventListener('transitionend',function(){
            todo.remove()
        })
    }

    // check mark
    if(item.classList[0]=='checkbtn'){
        const todo=item.parentElement
        todo.classList.toggle('complete')
    }

    if(item.classList[0]=='editbtn'){
        const todoitem=document.querySelector('.todo-item')
        console.log(todoitem.innerText)
        todoitem.innerHTML=`<input type=text class="editinput" value="${todoitem.innerText}">`
        console.log(todoitem.innerText)
    }
}



// filter function for todos
function filterTodo(e){
    const todos=todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display='flex'
                break
            case 'completed':
                if(todo.classList.contains('complete')){
                    todo.style.display='flex'
                }else{
                    todo.style.display='none'
                }
                break
            case 'incomplete':
                if(!todo.classList.contains('complete')){
                    todo.style.display='flex'
                }else{
                    todo.style.display='none'
                }
                break
        }
    })
}


// Local Storing of todos
function storetodo(todo){
    let todos;
    if(localStorage.getItem('todos') ==  null){
        todos=[]
    } else{
        todos =JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function gettodos(){
    let todos;
    if(localStorage.getItem('todos') ==  null){
        todos=[]
    } else{
        todos =JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const tododiv=document.createElement('div')
        tododiv.classList.add('todo')
        tododiv.innerHTML=`<li class='todo-item'>${todo}</li>
        <button class='checkbtn'><i class="fas fa-check"></i></button>
        <button class="editbtn"><i class="fas fa-edit"></i></button>
        <button class="trbtn"><i class="fas fa-trash"></i></button>`
        todoList.appendChild(tododiv)
    })
}

function remmovelocaltodos(todo){
    let todos;
    if(localStorage.getItem('todos') ==  null){
        todos=[]
    } else{
        todos =JSON.parse(localStorage.getItem('todos'))
    }
    const a=todo.children[0].innerText
    const todoindex= todos.indexOf(a)
    todos.splice(todoindex,1)
    localStorage.setItem("todos", JSON.stringify(todos))
}


