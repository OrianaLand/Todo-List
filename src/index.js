import "./styles.css";

import {
  renderAllTasks,
  renderDynamicCategories,
  renderCompletedTasks,
  renderTasksByCategory,
  renderThisWeekTasks,
  renderTodayTasks,
  populateCategoryDropdown,
  attachCategorySelectListener,
  openTodoDialog,
  openEditTodoDialog,
  submitNewTodo,
  closeTodoDialog,
  openCategoryDialog,
  submitNewCategory,
  closeCategoryDialog,
  getTodoById,
  removeCategory,
} from "./todoDOM.js";

import { deleteTodo } from "./todoList.js";

const darkModeBtn = document.querySelector(".checkbox-dark-mode");
const body = document.querySelector("body");

const hideSidebarBtn = document.querySelector(".checkbox-hide-sidebar");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");

const allTasksBtn = document.querySelector(".all-tasks-btn");
const todayTasksBtn = document.querySelector(".today-tasks-btn");
const upcomingTasksBtn = document.querySelector(".upcoming-tasks-btn");
const completedTasksBtn = document.querySelector(".completed-tasks-btn");

const staticCategoyList = document.querySelector(".categories");
const dynamicCategoryList = document.querySelector(".dynamic-categories");
const tasksListContainer = document.querySelector(".list-container");

const newTaskButtons = document.querySelectorAll(".new-task");
const closeDialogBtn = document.querySelector(".close-dialog-btn");
const addTaskForm = document.querySelector(".add-todo-form");

const newProjectBtn = document.querySelector(".new-project");
const closeNewCategoryDialogBtn = document.querySelector(
  ".close-project-dialog-btn"
);
const addNewCategoryForm = document.querySelector(".add-project-form");

let currentView = "all"; // default view on page load

function renderView() {
  if (currentView === "all") {
    renderAllTasks(currentView);
  } else if (currentView === "today") {
    renderTodayTasks(currentView);
  } else if (currentView === "completed") {
    renderCompletedTasks(currentView);
  } else if (currentView === "this-week") {
    renderThisWeekTasks(currentView);
  } else {
    renderTasksByCategory(currentView);
  }
  renderDynamicCategories();
}

function findCategorToRender(event) {
  const li = event.target.closest("li");

  if (!li) return;

  // Get the button inside this li
  const btn = li.querySelector("button");
  if (!btn) return;

  // Grab the category from the button
  currentView = btn.dataset.category;
}

function toggleDarkMode() {
  body.classList.toggle("dark-mode");
}

function hideSidebar() {
  sidebar.classList.toggle("hidden");
}

function expandMain() {
  main.classList.toggle("expand");
}

function removeProject(projectId, projectTitle, categoryLi) {
  if (
    confirm(
      "If you delete a Project you will lose all the tasks in it. Are you sure?"
    )
  ) {
    removeCategory(projectId, projectTitle, categoryLi);

    //render default view when current view is deleted
    if (currentView === projectId) {
      currentView = "all";
      renderView();
      return;
    }
    renderView();
  }
}

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

staticCategoyList.addEventListener("click", (event) => {
  findCategorToRender(event);
  renderView();
});

dynamicCategoryList.addEventListener("click", (event) => {
  findCategorToRender(event);
  renderView();
});

dynamicCategoryList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-category")) {
    const categoryLi = event.target.closest("li");
    const categoryBtn = categoryLi.querySelector(".dynamic-category-button");

    const projectTitle = categoryBtn.querySelector(".category-name").innerText;
    const projectId = categoryBtn.dataset.category;

    removeProject(projectId, projectTitle, categoryLi);
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

  const todo = getTodoById(taskId);
  openEditTodoDialog(todo);
});

tasksListContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-item")) return;

  const taskCard = event.target.closest(".item-conatiner");
  if (!taskCard) return;

  const taskId = taskCard.dataset.id;
  deleteTodo(taskId);

  // Remove DOM element
  taskCard.remove();
  renderView();
});

darkModeBtn.addEventListener("change", () => {
  toggleDarkMode();
});

hideSidebarBtn.addEventListener("click", () => {
  hideSidebar();
  expandMain();
});

renderDynamicCategories();
renderView();
