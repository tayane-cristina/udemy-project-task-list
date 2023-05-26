const writeTask = document.querySelector('.input-task')
const addTask = document.querySelector('.add-task')
const showTask = document.querySelector('.keep-task')



const addTaskAtList = (textInput) => {
    let myItenList = document.createElement('li')
    myItenList.classList.add('li')
    myItenList.innerText = textInput
    makeButtonTrash(myItenList)
    showTask.appendChild(myItenList)
    writeTask.value = ''
    saveTask()
}  

const makeButtonTrash = (li) => {
    let trash = document.createElement('button')
    trash.innerText = 'apagar'
    trash.setAttribute('class', 'trash')
    trash.setAttribute('title', 'Apagar está tarefa')
    li.appendChild(trash)
}   

const saveTask = () => {
    const allTasks = showTask.querySelectorAll('li');
    const list = []

    for (let task of allTasks){
        let taskText = task.innerText;
        taskText = taskText.replace('apagar', '').trim()
        list.push(taskText)
    }
    const taskJson = JSON.stringify(list) ;
    localStorage.setItem('tarefa', taskJson)
}

const showTaskSaved = () => {
    const tarefa = localStorage.getItem('tarefa');
    const list = JSON.parse(tarefa)
    
    for (let task of list){
        addTaskAtList(task)
    }
}
showTaskSaved()

writeTask.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        if (!(writeTask.value)) {
            alert('É necessário escrever uma tarefa')
            return;
        }
        addTaskAtList(writeTask.value)
    }
})

addTask.addEventListener('click', () => {
    if (!(writeTask.value)){
        alert('É necessário escrever uma tarefa')
        return;
    }
    addTaskAtList(writeTask.value)
})

document.addEventListener('click' , (e) => {
    const el = e.target;
    if (el.classList.contains('trash')){
        el.parentElement.remove()
        saveTask()
    }
})

