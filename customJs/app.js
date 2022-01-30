let addTaskInput = document.getElementById('addtaskinput')
let addTaskBtn = document.getElementById('addtaskbtn');
addTaskBtn.addEventListener("click",()=>{
    addTaskInputValue = addTaskInput.value; 
    if(addTaskInputValue != ''){
        let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = []
    }
    else{
        taskObj = JSON.parse(webtask);       
    }
    taskObj.push(addTaskInputValue);
    localStorage.setItem("localtask", JSON.stringify(taskObj))
    showPlan();
    addTaskInput.value = '';
    }  
})

const showPlan =()=>{
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = []
    }
    else{
        taskObj = JSON.parse(webtask);
    } 
    let html = '';
    let addTaskList = document.getElementById('addedtasklist');
    taskObj.forEach((item,index)=>{
        html +=` <tr class="row">
                    <th scope="row" class="col-2 col-sm-1 col-md-1">${index+1}</th>
                    <td class="col-10 col-sm-6 col-md-7"> ${item}</td>
                    <td class="col-6 col-sm-2 col-md-2">
                        <button type="button" onclick="updateTask(${index})" class="innerbtn text-danger">
                            <i class="fa fa-edit"></i> Edit
                        </button>
                    </td>
                    <td class="col-6 col-sm-3 col-md-2">
                        <button type="button" onclick="deleteBtn(${index})" class="deletebtn text-danger">
                            <i class="fa fa-trash"></i> Delete
                        </button>
                    </td>
                </tr>`
             });
        addTaskList.innerHTML = html;
}
showPlan();
//updateTask
const updateTask =(index)=>{
    
    const updateBtn = document.getElementById('updatebtn');
    const saveindex = document.getElementById('saveindex');

    saveindex.value = index;

    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    addTaskInput.value = taskObj[index];
    addTaskBtn.style.display="none";
    updateBtn.style.display='block';
}
//save update task
const updateBtn = document.getElementById('updatebtn');
updateBtn.addEventListener('click', ()=>{
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    const saveindex = document.getElementById('saveindex').value;
    taskObj[saveindex] = addTaskInput.value;
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addTaskInput.value = '';
    showPlan();
    addTaskBtn.style.display="block";
    updateBtn.style.display='none';
})


// delete plan
const deleteBtn = (index)=>{
    const text = confirm('Make sure you want to delete plan');
    if(text == true){
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        taskObj.splice(index,1)
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showPlan();
    }
    else{
        return 0;
    }
}
//deleteallbtn
const deleteallbtn = document.getElementById('deleteallbtn')
deleteallbtn.addEventListener('click',()=>{
    const text = confirm('Are you sure you want to delete all plan ?');
    if(text == true){
        let webtask = localStorage.getItem("localtask");
        let taskObj = JSON.parse(webtask);
        if(webtask == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(webtask);
            taskObj = [];   
        }
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        showPlan();
    }
    else{
        return 0;
    }
})

// search item//
const search = document.getElementById('searchtextbox')
search.addEventListener('input', ()=>{
    let todoList = document.querySelectorAll('tr');
    Array.from(todoList).forEach((item) => {
        let searchText = item.getElementsByTagName('td')[0].innerText;
        let searchValue = search.value;
        let re = new RegExp(searchValue,'gi');
        if(searchText.match(re)){
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})