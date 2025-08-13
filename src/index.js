import "./styles.css";

import { todoTasksList } from "./todoList.js";
import { todoCategoriesList } from "./todoList.js";
import { createTodoItem } from "./todoList.js";
import { addNewTodo } from "./todoList.js";
import { deleteTodo } from "./todoList.js";
import { editTodo } from "./todoList.js";
import { addCategory } from "./todoList.js";
import { markTodoAsCompleted } from "./todoList.js";

const taks1 = createTodoItem(
  "Download movie",
  "Cars II on plex/overseer",
  "02-03-25",
  "Personal",
  1
);
const taks2 = createTodoItem(
  "Todo list from TOP",
  "Divide and conquer. From small to big",
  "12-11-25",
  "Work",
  2
);
const taks3 = createTodoItem(
  "Buy Ibuprofen",
  "Go to farmacity they have 2x1",
  "05-10-25",
  "Health",
  1
);

addNewTodo(taks1);
addNewTodo(taks2);
addNewTodo(taks3);

/* addNewTodo(
  "Download movie",
  "Cars II on plex/overseer",
  "02-03-25",
  "Personal",
  1
);
addNewTodo(
  "Todo list from TOP",
  "Divide and conquer. From small to big",
  "12-11-25",
  "Work",
  2
);
addNewTodo(
  "Buy Ibuprofen",
  "Go to farmacity they have 2x1",
  "05-10-25",
  "Health",
  1
); */

console.log(todoTasksList);
console.log(todoCategoriesList);

addCategory("Travel");
addCategory("Work");
console.log(todoCategoriesList);
console.log(todoTasksList[0].done);
console.log(markTodoAsCompleted(todoTasksList[0]));
console.log(todoTasksList[0].done);
console.log(todoTasksList);
