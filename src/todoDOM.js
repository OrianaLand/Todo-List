import { todoTasksList } from "./todoList.js";
import { todoCategoriesList } from "./todoList.js";
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

export const renderAlltasks = () => {
  const allTasksUl = document.querySelector(".main-tasks");
  allTasksUl.innerText = "";

  for (let task of todoTasksList) {
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
    allTasksUl.append(taskCard);
  }
};

export const renderAllCategories = () => {
  const allCategoriessUl = document.querySelector(".dynamic-categories");
  allCategoriessUl.innerText = "";

  for (let taskCategory of todoTasksList) {
    const category = document.createElement("li");

    category.innerText = taskCategory.category;

    allCategoriessUl.append(category);
  }
};
