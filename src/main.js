addButton = document.getElementById("add-button");
let viewSection = document.getElementById("view-section");
let Body = document.body;
Body.append(viewSection);
// array of lists
arrayOfLists = [];
//
let Thecounter = 0;
let counterElement = document.getElementById("counter"); // defining counter
counterElement.innerText = "There are " + Thecounter + " Todos";
///
addButton.addEventListener("click", (event) => {
  if (document.getElementById("text-input").value !== null) {
    createNewContainer();
    resetingText();
    //counter
    Thecounter++;
    counterElement.innerText = "There are " + Thecounter + " Todos";
  }
});

sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", sort);

const createNewContainer = () => {
  let Container = document.createElement("div");
  Container.classList.add("todo-container");
  viewSection.append(Container);
  //creating elements that will be:span-div-viewsection-body
  todoText = document.createElement("span");
  todoText.innerText = document.getElementById("text-input").value;
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

  arrayOfLists.push(Container);
};
//
const resetingText = () => {
  document.getElementById("text-input").value = "";
};
//// sorting
function sort() {
  let sortArr = [];
  for (let i = 5; i > 0; i--) {
    for (let j = 0; j < arrayOfLists.length; j++) {
      if (
        arrayOfLists[j].querySelector(".todo-priority").innerText === String(i)
      ) {
        sortArr.push(arrayOfLists[j]);
      }
    }
  }
  // arrayOfLists = sortArr;
  for (let item of sortArr) {
    viewSection.append(item);
  }
}
