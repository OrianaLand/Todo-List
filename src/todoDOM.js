import {
  tasksManager,
  addNewTodo,
  addNewCategory,
  editTodo,
  toggleTodoDone,
  deleteCategory,
} from "./todoList.js";
import { format } from "date-fns";

const todoDialog = document.querySelector(".add-todo-dialog");
const categoryDialog = document.querySelector(".add-project-dialog");

function createTaskCardElement(task) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("item-conatiner");
  taskCard.dataset.id = task.id;

  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("checkbox-container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.done; // reflect initial state

  checkbox.addEventListener("change", () => {
    toggleTodoDone(task.id); // flips the done property
    title.style.textDecoration = task.done ? "line-through" : "none"; //test. Send to CSS when working with styles
    /* if (task.done) {
      taskCard.classList.add("completed");
    } else {
      taskCard.classList.remove("completed");
    } */
  });

  const cardInfo = document.createElement("div");
  cardInfo.classList.add("item-info");

  const title = document.createElement("h2");
  const description = document.createElement("p");
  const dueDate = document.createElement("p");
  const category = document.createElement("p");
  const priority = document.createElement("p");

  title.innerText = task.title;
  description.innerText = task.description;
  dueDate.innerText = tasksManager.formatDate(task.dueDate);
  category.innerText = task.category;
  priority.innerText = task.priority;

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-item");
  editBtn.textContent = "✏️";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-item");
  deleteBtn.textContent = "🗑️";

  checkboxContainer.append(checkbox);
  cardInfo.append(title, description, dueDate, category);
  btnContainer.append(editBtn, deleteBtn);

  taskCard.append(checkboxContainer, cardInfo, btnContainer, priority);

  return taskCard;
}

function renderEmptyMsg(currentView) {
  const allTasksUl = document.querySelector(".tasks-list");
  allTasksUl.innerText = "";
  const emptyMsg = document.createElement("p");

  if (currentView === "completed") {
    emptyMsg.innerHTML = "Let’s get one done!";
    allTasksUl.append(emptyMsg);
    return;
  }

  emptyMsg.innerHTML = "No tasks to show here";
  allTasksUl.append(emptyMsg);
}

function renderTasks(currentTasks, currentView) {
  const allTasksUl = document.querySelector(".tasks-list");
  allTasksUl.innerText = "";

  if (currentTasks.length === 0) {
    renderEmptyMsg(currentView);
    return;
  }

  for (let task of currentTasks) {
    const taskCard = createTaskCardElement(task);
    allTasksUl.append(taskCard);
  }
}

export const renderAllTasks = (currentView) => {
  let allTasks = tasksManager.getAllTasks();
  renderTasks(allTasks, currentView);
};

export const renderCompletedTasks = (currentView) => {
  let completedTasks = tasksManager.getCompletedTasks();
  renderTasks(completedTasks, currentView);
};

export const renderThisWeekTasks = (currentView) => {
  let thisWeekTasks = tasksManager.getThisWeekTasks();
  renderTasks(thisWeekTasks, currentView);
};

export const renderTodayTasks = (currentView) => {
  const todayTasks = tasksManager.getTodayTasks();
  renderTasks(todayTasks, currentView);
};

export const renderTasksByCategory = (category) => {
  let tasksOfCategory = tasksManager.getTasksByCategory(category);
  renderTasks(tasksOfCategory, category);
};

export const renderDynamicCategories = () => {
  const allCategoriessUl = document.querySelector(".dynamic-categories");
  allCategoriessUl.innerText = "";
  let dynamicCategories = tasksManager.getAllCategories();
  for (let category of dynamicCategories) {
    const categoryLi = document.createElement("li");
    const categoryBtn = document.createElement("button");
    const textSpan = document.createElement("span");
    const counterSpan = document.createElement("span");

    categoryBtn.classList.add("dynamic-category-button");
    categoryBtn.dataset.category = category.id;

    textSpan.innerText = category.title;
    textSpan.classList.add("category-name");

    counterSpan.classList.add("counter");
    counterSpan.id = category.id;

    categoryBtn.append(textSpan, counterSpan);
    categoryLi.append(categoryBtn);

    if (category.title !== "General") {
      const deleteCategorybtn = document.createElement("button");
      deleteCategorybtn.innerText = "x";
      deleteCategorybtn.classList.add("delete-category");
      categoryLi.append(deleteCategorybtn);
    }
    allCategoriessUl.append(categoryLi);
  }
};

export function populateCategoryDropdown() {
  const categorySelect = document.getElementById("category");

  // clear old options
  categorySelect.innerHTML = "";

  const categories = tasksManager.getAllCategories();

  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat.title;
    option.textContent = cat.title;
    categorySelect.appendChild(option);
  });

  const newCatOption = document.createElement("option");
  newCatOption.value = "__new__";
  newCatOption.textContent = "+ Add new category";
  categorySelect.appendChild(newCatOption);
}

export const openTodoDialog = () => {
  todoDialog.showModal();
  document.getElementById("dummy-focus").focus();
};

export const closeTodoDialog = () => {
  const editingId = todoDialog.dataset.editingId;
  if (editingId) {
    delete todoDialog.dataset.editingId; //clear edit
    const addTodoBtn = document.querySelector(".add-to-list");
    addTodoBtn.innerText = "Add to-do";
  }
  todoDialog.close();
};

export const submitNewTodo = () => {
  const title = document.querySelector("#title").value.trim();
  const description = document.querySelector("#description").value.trim();
  const date = document.querySelector("#date").value.trim();
  const category = document.querySelector("#category").value.trim();
  const priority = document.querySelector("#priority").value.trim();

  if (!title || !date || !category || !priority) {
    alert("Please fill in all the required fields");
    return;
  }

  const editingId = todoDialog.dataset.editingId;
  if (editingId) {
    editTodo(title, description, date, category, priority, editingId);
    delete todoDialog.dataset.editingId; //clear edit

    const addTodoBtn = document.querySelector(".add-to-list");
    addTodoBtn.innerText = "Add to-do";
  } else {
    addNewTodo(title, description, date, category, priority);
  }
};

export const openCategoryDialog = () => {
  categoryDialog.showModal();
};

export const closeCategoryDialog = () => {
  categoryDialog.close();
};

export const submitNewCategory = () => {
  const newCategory = document.querySelector("#project").value.trim();
  if (!newCategory) {
    alert("Please fill in all the required fields");
    return;
  }

  addNewCategory(newCategory);
};

export const openEditTodoDialog = (todo) => {
  //Prefill modal inputs
  document.querySelector("#title").value = todo.title;
  document.querySelector("#description").value = todo.description;
  document.querySelector("#date").value = format(todo.dueDate, "yyyy-MM-dd");
  populateCategoryDropdown(); //Populate dropdown before filling the category input
  document.querySelector("#category").value = todo.category;
  document.querySelector("#priority").value = todo.priority;

  //Store id to indetify edit mode
  todoDialog.dataset.editingId = todo.id;

  //Use Add todo button to submit edit
  const editTodoBtn = document.querySelector(".add-to-list");
  editTodoBtn.innerText = "Edit";

  todoDialog.showModal();
  document.getElementById("dummy-focus").focus();
};

export const getTodoById = (id) => {
  const todo = tasksManager.getTaskById(id);
  return todo;
};

export const removeCategory = (id, title, categoryLi) => {
  deleteCategory(id, title);

  //Remove DOM element
  categoryLi.remove();
};

export function attachCategorySelectListener() {
  const categorySelect = document.getElementById("category");

  categorySelect.addEventListener("change", (event) => {
    if (event.target.value === "__new__") {
      openCategoryDialog();
      categorySelect.value = "General"; //reset back to default
    }
  });
}
