import { todoTasksList } from "./todoList.js";
import { todoCategoriesList } from "./todoList.js";
import { taskCategoryCounter } from "./todoList.js";
import { createTodoItem } from "./todoList.js";
import { addNewTodo } from "./todoList.js";
import { deleteTodo } from "./todoList.js";
import { editTodo } from "./todoList.js";
import { addCategory } from "./todoList.js";
import { markTodoAsCompleted } from "./todoList.js";

import { log } from "./todoList.js";

export function logAgain() {
  log();
}

function createTaskCardElement(task) {
  const taskCard = document.createElement("div");
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

  taskCard.append(title, description, dueDate, category, priority);

  return taskCard;
}

export const renderAllTasks = () => {
  const allTasksUl = document.querySelector(".tasks-list");
  allTasksUl.innerText = "";
  let taskCounter = 0;

  for (let task of todoTasksList) {
    taskCounter++;
    const taskCard = createTaskCardElement(task);
    allTasksUl.append(taskCard);
  }
  console.log("all tasks counter: " + taskCounter);
};

export const renderCompletedTasks = () => {
  const allTasksUl = document.querySelector(".tasks-list");
  allTasksUl.innerText = "";

  for (let completedTask of todoTasksList) {
    if (completedTask.done) {
      const taskCard = createTaskCardElement(completedTask);
      allTasksUl.append(taskCard);
    }
  }
};

export const renderDynamicCategories = () => {
  const allCategoriessUl = document.querySelector(".dynamic-categories");
  allCategoriessUl.innerText = "";

  for (let category of todoCategoriesList) {
    const categoryLi = document.createElement("li");
    const categoryBtn = document.createElement("button");
    const textSpan = document.createElement("span");
    const counterSpan = document.createElement("span");

    let slug = category.toLowerCase().replace(/\s+/g, "-");

    categoryBtn.classList.add("category-button");
    categoryBtn.dataset.category = slug;

    textSpan.innerText = category;
    textSpan.classList.add("category-name");

    counterSpan.classList.add("counter");
    counterSpan.id = `${slug}-tasks`;

    categoryBtn.append(textSpan, counterSpan);
    categoryLi.append(categoryBtn);
    allCategoriessUl.append(categoryLi);
  }
}; //rename to renderDynamicCategories

//How do we render each project tasks?
//crate task counter function
