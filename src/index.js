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

import { toggleTodoDone, deleteTodo } from "./todoList.js";

const darkModeBtn = document.querySelector(".checkbox-dark-mode");
const body = document.querySelector("body");

const hideSidebarBtn = document.querySelector(".checkbox-hide-sidebar");
const sidebar = document.querySelector(".sidebar");
const main = document.querySelector(".main");

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

const addProjectDialog = document.querySelector(".add-project-dialog");
const addTodoDialog = document.querySelector(".add-todo-dialog");

let currentView = "all-tasks"; // default view on page load

function renderView() {
  if (currentView === "all-tasks") {
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

function removeTodo(todoCard) {
  if (confirm("Do you want to permanently delete this task?")) {
    const todoID = todoCard.dataset.id;
    deleteTodo(todoID);
    //Remove DOM element
    todoCard.remove();
    renderView();
  }
}

function setupCloseOnBackdropClick(dialog, form) {
  dialog.addEventListener("click", (event) => {
    // If the clicked element is the dialog itself (not its children), close it
    if (event.target === dialog) {
      form.reset();
      dialog.close();
    }
  });
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

  const projectName = document.querySelector("#project").value.trim();

  projectName.setCustomValidity("");

  if (!projectName) {
    projectName.setCustomValidity("Project name cannot be empty.");
  }
  if (projectName.length > 20) {
    projectName.setCustomValidity(
      "Project name cannot be longer than 20 characters."
    );
  }

  if (!addNewCategoryForm.checkValidity()) {
    event.preventDefault();
    projectInput.reportValidity(); // triggers browser tooltip
    return;
  }

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

  const title = document.querySelector("#title").value.trim();

  titleInput.setCustomValidity("");

  if (!title) {
    titleInput.setCustomValidity("Title cannot be empty.");
  } else if (title.length > 20) {
    titleInput.setCustomValidity("Title cannot be longer than 20 characters.");
  }

  if (!addTaskForm.checkValidity()) {
    event.preventDefault();
    titleInput.reportValidity();
    return;
  }

  submitNewTodo();
  addTaskForm.reset();
  closeTodoDialog();
  renderView();
});

tasksListContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("edit-item")) return;

  const taskCard = event.target.closest(".item-container");

  const taskId = taskCard.dataset.id;

  const todo = getTodoById(taskId);
  openEditTodoDialog(todo);
});

tasksListContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("delete-item")) return;
  const taskCard = event.target.closest(".item-container");

  if (!taskCard) return;

  removeTodo(taskCard);
});

tasksListContainer.addEventListener("click", (event) => {
  if (!event.target.classList.contains("task-checkbox")) return;
  const taskCard = event.target.closest(".item-container");

  if (!taskCard) return;

  const taskId = taskCard.dataset.id;

  toggleTodoDone(taskId);

  renderView();
});

darkModeBtn.addEventListener("change", () => {
  toggleDarkMode();
});

hideSidebarBtn.addEventListener("click", () => {
  hideSidebar();
  expandMain();
});

setupCloseOnBackdropClick(addProjectDialog, addNewCategoryForm);
setupCloseOnBackdropClick(addTodoDialog, addTaskForm);

renderDynamicCategories();
renderView();
