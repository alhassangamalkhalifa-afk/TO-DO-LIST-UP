let tasks = [
  {name:"task 1", desc:"task 1", status:"created"},
  {name:"task 2", desc:"task 2", status:"done"},
  {name:"task 3", desc:"task 3", status:"created"}
];

function displayTaskes(){
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  tasks.forEach((task, index) => {
    let isDone = task.status.includes("done");
    let statusClass = isDone? "done" : "created";
    let statusText = isDone? "Done" : "Created";

    tbody.innerHTML += `
      <tr>
        <td>${task.name}</td>
        <td>${task.desc}</td>
        <td><span class="status ${statusClass}" onclick="changeStatus(${index})">${statusText}</span></td>
        <td>
          <div class="actions">
            <button class="btn-del" onclick="deleteTask(${index})">🗑</button>
            <button class="btn-edit" onclick="updateTask(${index})">✎</button>
          </div>
        </td>
      </tr>
    `;
  });
}


function addTask(){
  let taskName = prompt("enter task name");
  let taskDesc = prompt("enter task description");

  if(!taskName ||!taskName.trim() ||!taskDesc ||!taskDesc.trim()){
    alert("Enter name and description!");
    return;
  }

  tasks.push({
    name: taskName,
    desc: taskDesc,
    status: "created"
  });

  displayTaskes();
}

function changeStatus(index){
  let isCreated = tasks[index].status.startsWith("c");
  tasks[index].status = isCreated? "done" : "created";
  displayTaskes();
}

function deleteTask(index){
  tasks.splice(index, 1);
  displayTaskes();
}

function updateTask(index){
  let selectedIndex = index + 1;
  let chooseUpdate = confirm("want to update task name?");

  if(chooseUpdate){
    let newName = prompt("enter task name", tasks[selectedIndex - 1].name);
    if(typeof newName === 'string' && newName.trim()){
      tasks[selectedIndex - 1].name = newName;
    }
  } else {
    let newDesc = prompt("enter task desc", tasks[selectedIndex - 1].desc);
    if(typeof newDesc === 'string' && newDesc.trim()){
      tasks[selectedIndex - 1].desc = newDesc;
    }
  }

  displayTaskes();
}

displayTaskes();