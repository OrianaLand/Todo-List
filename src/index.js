import "./styles.css";

import { renderAllTasks } from "./todoDOM.js";
import { renderDynamicCategories } from "./todoDOM.js";
import { renderCompletedTasks } from "./todoDOM.js";
import { renderTasksByCategory } from "./todoDOM.js";
import { renderTodayTasks } from "./todoDOM.js";
import { populateCategoryDropdown } from "./todoDOM.js";
import { attachCategorySelectListener } from "./todoDOM.js";
import { openTodoDialog } from "./todoDOM.js";
import { submitNewTodo } from "./todoDOM.js";
import { closeTodoDialog } from "./todoDOM.js";
import { openCategoryDialog } from "./todoDOM.js";
import { submitNewCategory } from "./todoDOM.js";
import { closeCategoryDialog } from "./todoDOM.js";
import { getTodoById } from "./todoDOM.js";

const allTasksBtn = document.querySelector(".all-tasks-btn");
const todayTasksBtn = document.querySelector(".today-tasks-btn");
const upcomingTasksBtn = document.querySelector(".upcoming-tasks-btn");
const completedTasksBtn = document.querySelector(".completed-tasks-btn");
const dynamicCategoryList = document.querySelector(".dynamic-categories");

const newTaskButtons = document.querySelectorAll(".new-task");
const closeDialogBtn = document.querySelector(".close-dialog-btn");
const addTaskForm = document.querySelector(".add-todo-form");

const newProjectBtn = document.querySelector(".new-project");
const closeNewCategoryDialogBtn = document.querySelector(
  ".close-project-dialog-btn"
);
const addNewCategoryForm = document.querySelector(".add-project-form");

const tasksListContainer = document.querySelector(".list-container");

let currentView = "all"; // default view on page load

function renderView() {
  if (currentView === "all") {
    renderAllTasks();
  } else if (currentView === "today") {
    renderTodayTasks();
  } else if (currentView === "completed") {
    renderCompletedTasks();
  } else if (currentView === "upcoming") {
    console.log("upcoming");
  } else {
    renderTasksByCategory(currentView);
    console.log(currentView);
  }
  renderDynamicCategories();
}

allTasksBtn.addEventListener("click", () => {
  currentView = "all";
  renderView();
});

todayTasksBtn.addEventListener("click", () => {
  currentView = "today";
  renderView();
});

upcomingTasksBtn.addEventListener("click", () => {
  currentView = "upcoming";
  renderView();
});

completedTasksBtn.addEventListener("click", () => {
  currentView = "completed";
  renderView();
});

newProjectBtn.addEventListener("click", () => {
  openCategoryDialog();
});

closeNewCategoryDialogBtn.addEventListener("click", () => {
  addNewCategoryForm.reset();
  closeCategoryDialog();
});

addNewCategoryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitNewCategory();
  addNewCategoryForm.reset();
  closeCategoryDialog();
  populateCategoryDropdown();
  renderDynamicCategories();
});

dynamicCategoryList.addEventListener("click", (event) => {
  if (event.target.closest(".dynamic-category-button")) {
    const btn = event.target.closest(".dynamic-category-button");
    currentView = btn.dataset.category; // currentView is equivalent to the category
    console.log(currentView);
    renderView();
  }
});

newTaskButtons.forEach((button) => {
  button.addEventListener("click", () => {
    populateCategoryDropdown();
    attachCategorySelectListener();
    openTodoDialog();
  });
});

closeDialogBtn.addEventListener("click", () => {
  addTaskForm.reset();
  closeTodoDialog();
});

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitNewTodo();
  addTaskForm.reset();
  closeTodoDialog();
  renderView();
});

tasksListContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("edit-item")) return;

  const taskCard = event.target.closest(".item-conatiner");
  const taskId = taskCard.dataset.id;

  getTodoById(taskId);
});

renderDynamicCategories();
renderAllTasks();
