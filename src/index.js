import "./styles.css";

import { renderAllTasks } from "./todoDOM.js";
import { renderDynamicCategories } from "./todoDOM.js";
import { renderCompletedTasks } from "./todoDOM.js";
import { renderTasksByCategory } from "./todoDOM.js";
import { renderTodayTasks } from "./todoDOM.js";
import { openTodoDialog } from "./todoDOM.js";
import { submitNewTodo } from "./todoDOM.js";
import { closeTodoDialog } from "./todoDOM.js";

const allTasksBtn = document.querySelector(".all-tasks-btn");
const todayTasksBtn = document.querySelector(".today-tasks-btn");
const upcomingTasksBtn = document.querySelector(".upcoming-tasks-btn");
const completedTasksBtn = document.querySelector(".completed-tasks-btn");
const dynamicCategoryList = document.querySelector(".dynamic-categories");

const newTaskButtons = document.querySelectorAll(".new-task");
const closeDialogBtn = document.querySelector(".close-dialog-btn");
const addTaskForm = document.querySelector(".add-todo-form");

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

dynamicCategoryList.addEventListener("click", (event) => {
  if (event.target.closest(".dynamic-category-button")) {
    const btn = event.target.closest(".dynamic-category-button");
    currentView = btn.dataset.category; // currentView is equivalent to the category
    renderView();
  }
});

newTaskButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openTodoDialog();
  });
});

closeDialogBtn.addEventListener("click", () => {
  closeTodoDialog();
});

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitNewTodo();
  addTaskForm.reset();
  closeTodoDialog();
  renderView();
});

renderDynamicCategories();
renderAllTasks();
