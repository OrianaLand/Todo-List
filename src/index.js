import "./styles.css";

import { logAgain, submitNewTodo } from "./todoDOM.js";
import { renderAllTasks } from "./todoDOM.js";
import { renderDynamicCategories } from "./todoDOM.js";
import { renderCompletedTasks } from "./todoDOM.js";
import { renderTasksByCategory } from "./todoDOM.js";
import { renderTodayTasks } from "./todoDOM.js";
import { openTodoDialog } from "./todoDOM.js";
import { closeTodoDialog } from "./todoDOM.js";

const allTasksBtn = document.querySelector(".all-tasks-btn");
const todayTasksBtn = document.querySelector(".today-tasks-btn");
const upcomingTasksBtn = document.querySelector(".upcoming-tasks-btn");
const completedTasksBtn = document.querySelector(".completed-tasks-btn");
const dynamicCategoryList = document.querySelector(".dynamic-categories");

const newTaskButtons = document.querySelectorAll(".new-task");
const closeDialogBtn = document.querySelector(".close-dialog-btn");
const addTaskForm = document.querySelector(".add-todo-form");

logAgain();

renderDynamicCategories(); //on page load
renderCompletedTasks(); // Action for Completed li button listener
renderTasksByCategory("Health"); //Action for each dynamic category button listener. Call function with category-name inner text
renderTodayTasks();
renderAllTasks(); //Action for All tasks li button listener

newTaskButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openTodoDialog();
  });
});

allTasksBtn.addEventListener("click", () => {
  renderAllTasks();
});

todayTasksBtn.addEventListener("click", () => {
  renderTodayTasks();
});

upcomingTasksBtn.addEventListener("click", () => {});

completedTasksBtn.addEventListener("click", () => {
  renderCompletedTasks();
});

dynamicCategoryList.addEventListener("click", (event) => {
  if (event.target.closest(".dynamic-category-button")) {
    const btn = event.target.closest(".dynamic-category-button");
    const category = btn.dataset.category;
    renderTasksByCategory(category);
  }
});

closeDialogBtn.addEventListener("click", () => {
  closeTodoDialog();
});

addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitNewTodo();
  addTaskForm.reset();
  closeTodoDialog();
});
