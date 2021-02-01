async function main() {
  addButton = document.getElementById("add-button");
  let viewSection = document.getElementById("view-section");
  let Body = document.body;
  Body.append(viewSection);
  //fetching and printing waiting data
  arrayOrderd = [];
  //fettching data and creating element to saved priorities
  let arrayOfLists = await fetchData();
  for (let loadedTasks of arrayOfLists) {
    let Container = document.createElement("div");
    Container.classList.add("todo-container");
    viewSection.append(Container);
    //
    todoTextLoaded = document.createElement("span");
    todoTextLoaded.classList.add("todo-text");
    todoTextLoaded.innerText = loadedTasks["text"];
    Container.append(todoTextLoaded);
    //
    let creationTimeLoaded = document.createElement("span");
    creationTimeLoaded.classList.add("todo-created-at");
    creationTimeLoaded.innerText = loadedTasks["date"];
    Container.append(creationTimeLoaded);
    //
    let priorityNumLoaded = document.createElement("span");
    priorityNumLoaded.classList.add("todo-priority");
    priorityNumLoaded.innerText = loadedTasks["priority"];
    Container.append(priorityNumLoaded);
    //
    arrayOrderd.push(Container);
    //delete button for loaded content
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = "Delete";
    Container.append(deleteButton);
    deleteButton.addEventListener("click", async function (event) {
      event.target.parentNode.remove();
      if (arrayOfLists.length === 1) {
        arrayOfLists = [];
      }
      for (let i = 0; i < arrayOfLists.length; i++) {
        if (
          arrayOfLists[i].date ===
          event.target.parentNode.querySelector(".todo-created-at").innerText
        );
        {
          alert("deleted");
          arrayOfLists = arrayOfLists.splice(i, 1);
        }
      }
      await putData(arrayOfLists);
    });

    //creating edit num
    let editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerHTML = "Edit";
    let newInputBox = document.createElement("input");
    Container.append(newInputBox);
    newInputBox.hidden = true;
    Container.append(editButton);
    editButton.addEventListener("click", async function (event) {
      newInputBox.hidden = !newInputBox.hidden;
      if (
        newInputBox.value !== null &&
        newInputBox.value !== "" &&
        newInputBox.value !== " "
      ) {
        for (let i = 0; i < arrayOfLists.length; i++) {
          let newInput = newInputBox.value;
          if (
            arrayOfLists[i].text ===
            event.target.parentNode.querySelector(".todo-text").innerText
          );
          {
            arrayOfLists[i].text = newInput;
            event.target.parentNode.querySelector(
              ".todo-text"
            ).innerText = newInput;
          }
        }
      }
      await putData(arrayOfLists);
    });
  }
  //definding counter as as araay length
  let Thecounter = arrayOfLists.length;
  let counterElement = document.getElementById("counter"); // defining counter
  counterElement.innerText = Thecounter;
  ///
  addButton.addEventListener("click", async (event) => {
    if (
      document.getElementById("text-input").value !== "" &&
      document.getElementById("text-input").value !== " "
    ) {
      await createNewContainer();

      resetingText();
      Thecounter = arrayOfLists.length;
      counterElement.innerText = Thecounter;
    }
  });

  sortButton = document.getElementById("sort-button");
  sortButton.addEventListener("click", sort);

  const createNewContainer = async () => {
    let Container = document.createElement("div");
    Container.classList.add("todo-container");
    viewSection.append(Container);
    //creating elements that will be:span-div-viewsection-body
    let todoText = document.createElement("span");
    todoText.innerHTML = document.getElementById("text-input").value;
    todoText.classList.add("todo-text");
    Container.append(todoText);
    //
    let creationTime = document.createElement("span");
    let Dates = new Date();
    Dates = Dates.toISOString().slice(0, 19).replace("T", " "); ///turning date to sql by simple method
    creationTime.classList.add("todo-created-at");
    creationTime.innerText = Dates;
    Container.append(creationTime);
    //
    let priorityNum = document.createElement("span");
    priorityNum.classList.add("todo-priority");
    priorityNum.innerText = document.getElementById("priority-selector").value;
    Container.append(priorityNum);
    //pushing object info to araay
    let containerObject = {
      text: todoText.innerText,
      priority: priorityNum.innerText,
      date: creationTime.innerText,
    };

    arrayOrderd.push(Container);
    arrayOfLists.push(containerObject);
    await putData(arrayOfLists);
    //delete-button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = "Delete";
    Container.append(deleteButton);
    deleteButton.addEventListener("click", async function (event) {
      event.target.parentNode.remove();
      for (let i = 0; i < arrayOfLists.length; i++) {
        if (
          arrayOfLists[i].date ===
          event.target.parentNode.querySelector(".todo-created-at").innerText
        );
        {
          alert("Deleted");
          arrayOfLists = arrayOfLists.splice(i, 1);
        }
      }
      await putData(arrayOfLists);
    });
    //deleting editing function
    let editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerHTML = "Edit";
    let newInputBox = document.createElement("input");
    Container.append(newInputBox);
    newInputBox.hidden = true;
    Container.append(editButton);
    editButton.addEventListener("click", async function (event) {
      newInputBox.hidden = !newInputBox.hidden;
      if (
        newInputBox.value !== null &&
        newInputBox.value !== "" &&
        newInputBox.value !== " "
      ) {
        for (let i = 0; i < arrayOfLists.length; i++) {
          let newInput = newInputBox.value;
          if (
            arrayOfLists[i].text ===
            event.target.parentNode.querySelector(".todo-text").innerText
          );
          {
            arrayOfLists[i].text = newInput;
            event.target.parentNode.querySelector(
              ".todo-text"
            ).innerText = newInput;
          }
        }
      }
      await putData(arrayOfLists);
    });
  };

  //restarting
  const resetingText = () => {
    document.getElementById("text-input").value = "";
  };
  //// sorting

  function sort() {
    let sortArr = [];
    for (let i = 5; i > 0; i--) {
      for (let j = 0; j < arrayOrderd.length; j++) {
        if (
          arrayOrderd[j].querySelector(".todo-priority").innerText === String(i)
        ) {
          sortArr.push(arrayOrderd[j]);
        }
      }
    }

    for (let item of sortArr) {
      viewSection.append(item);
    }
  }

  async function fetchData() {
    let response = await fetch(
      "https://api.jsonbin.io/v3/b/6016d7d90ba5ca5799d1ae1e/latest"
    );
    let jsonResponse = await response.json();
    let recordResponse = jsonResponse["record"];
    tasks = recordResponse["my-todo"];
    console.log(tasks);
    return tasks;
  }
  async function putData(arrayOfLists) {
    await fetch("https://api.jsonbin.io/v3/b/6016d7d90ba5ca5799d1ae1e", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ "my-todo": arrayOfLists }),
    });
  }
}
function darkMode() {
  let body = document.body;
  body.classList.toggle("dark");
}

main();
//
