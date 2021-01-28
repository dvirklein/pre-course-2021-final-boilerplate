addButton = document.getElementById("add-button");

console.log(addButton);
let viewSection = document.getElementById("view-section");
let Body = document.body;
Body.append(viewSection);

addButton.addEventListener("click", (event) => {
  let allInfo = document.createElement("div");
  allInfo.classList.add("todo-container");
  viewSection.append(allInfo);
  //creating elements that will be:span-div-viewsection-body
  todoText = document.createElement("span");
  todoText.innerText = document.getElementById("text-input").value;
  todoText.classList.add("todo-text");
  allInfo.append(todoText);

  let creationTime = document.createElement("span");
  let Dates = new Date();
  Dates = Dates.toISOString().slice(0, 19).replace("T", " "); ///turning date to sql by simple method
  creationTime.classList.add("todo-created-at");
  creationTime.innerText = Dates;
  allInfo.append(creationTime);

  let priorityNum = document.createElement("span");
  priorityNum.classList.add("todo-priority");
  priorityNum.innerText = document.getElementById("priority-selector").value;
  allInfo.append(priorityNum);

  document.getElementById("text-input").value = ""; //reseting every click
  
});
