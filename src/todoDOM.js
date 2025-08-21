import { tasksManager } from "./todoList.js";
import { createTodoItem } from "./todoList.js";
import { addNewTodo } from "./todoList.js";
import { deleteTodo } from "./todoList.js";
import { editTodo } from "./todoList.js";
import { markTodoAsCompleted } from "./todoList.js";

import { log } from "./todoList.js";

export function logAgain() {
  log();
}

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
    task.toggleDoneStatus(); // flips the done property
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

  title.innerText = task._title;
  description.innerText = task.description;
  dueDate.innerText = task.dueDate;
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

export const renderAllTasks = () => {
  const allTasksUl = document.querySelector(".tasks-list");
  allTasksUl.innerText = "";
  let taskCounter = 0;
  let allTasks = tasksManager.getAllTasks();

  for (let task of allTasks) {
    taskCounter++;
    const taskCard = createTaskCardElement(task);
    allTasksUl.append(taskCard);
  }
  console.log("all tasks counter: " + taskCounter);
};

export const renderCompletedTasks = () => {
  const allTasksUl = document.querySelector(".tasks-list");
  allTasksUl.innerText = "";
  let allTasks = tasksManager.getCompletedTasks();

  for (let completedTask of allTasks) {
    const taskCard = createTaskCardElement(completedTask);
    allTasksUl.append(taskCard);
  }
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

    categoryBtn.classList.add("category-button");
    categoryBtn.dataset.category = category;

    textSpan.innerText = category
      .replace("-tasks", "") // remove "-tasks"
      .replace(/-/g, " ") // replace "-" with spaces
      .replace(/^./, (c) => c.toUpperCase()); // capitalize only the very first character

    textSpan.classList.add("category-name");

    counterSpan.classList.add("counter");
    counterSpan.id = category;

    categoryBtn.append(textSpan, counterSpan);
    categoryLi.append(categoryBtn);
    allCategoriessUl.append(categoryLi);
  }
};

export const renderTasksByCategory = (category) => {
  const allTasksUl = document.querySelector(".tasks-list");
  allTasksUl.innerText = "";
  let allTasks = tasksManager.getTasksByCategory(category);

  for (let task of allTasks) {
    const taskCard = createTaskCardElement(task);
    allTasksUl.append(taskCard);
  }
};

export const renderTodayTasks = () => {
  const allTasksUl = document.querySelector(".tasks-list");
  allTasksUl.innerText = "";
  const todayTasks = tasksManager.getTodayTasks();
  console.log(todayTasks);

  for (let task of todayTasks) {
    const taskCard = createTaskCardElement(task);
    allTasksUl.append(taskCard);
  }
};

const tasksListContainer = document.querySelector(".list-container");
tasksListContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-item")) return;

  const taskCard = event.target.closest(".item-conatiner");
  if (!taskCard) return;

  const taskId = taskCard.dataset.id;
  deleteTodo(taskId);

  // Remove DOM element
  taskCard.remove();
});
