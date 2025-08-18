import Todo from "./todoItem.js";

class TaskCategoryCounter {
  constructor() {
    this.categories = {};
  }

  // Format category to match DOM ID style
  formatKey(category) {
    let key = category.toLowerCase().replace(/\s+/g, "-");

    // Avoid double "-tasks" if it already ends with "tasks"
    if (!key.endsWith("-tasks")) {
      key = `${key}-tasks`;
    }
    return key;
  }

  addSingleCategory(category) {
    const key = this.formatKey(category);
    this.categories[key] = (this.categories[key] || 0) + 1;
  }

  addMultipleCategories(categories) {
    categories.forEach((category) => this.addSingleCategory(category));
  }

  getCount(category) {
    const key = this.formatKey(category);
    return this.categories[key] || 0;
  }

  getAllCounts() {
    return { ...this.categories };
  }
}

export const taskCategoryCounter = new TaskCategoryCounter();
export const todoTasksList = [];
export const todoCategoriesList = [];

export const createTodoItem = (
  title,
  description,
  dueDate,
  category,
  priority
) => {
  return new Todo(title, description, dueDate, category, priority);
};

export const addNewTodo = (todo) => {
  todoTasksList.push(todo);
  addCategory(todo.category);
};

export const editTodo = (todosArray) => {
  const index = prompt(
    `which todo do you want to edit from 1 to ${todosArray.length}`
  );
  if (index === "" || index < 1) {
    console.log("no todo edited");
    return;
  } else {
    //Edit title only - test
    const newTitle = prompt("Enter new title");
    if (newTitle) {
      console.log(
        `Title: "${todosArray[index - 1]._title}" updated to: "${newTitle}"`
      );
      todosArray[index - 1].title = newTitle; //calls the setter;
      return todosArray;
    } else {
      console.log("Title can't be empty");
    }
  }
};

export const deleteTodo = (todosArray) => {
  const index = prompt(
    `which todo do you want to delete from 1 to ${todosArray.length - 1}`
  );

  if (index === "" || index < 1) {
    console.log("no todo deleted");
    return;
  } else {
    console.log(`Todo "${todosArray[index - 1].title}" has been deleted`);
    todoList.splice(index - 1, 1);
    return todoList;
  }
};

export const addCategory = (categoryName) => {
  todoCategoriesList.push(categoryName);
  taskCategoryCounter.addSingleCategory(categoryName);
}; //This function might be removed in the future

export const markTodoAsCompleted = (todo) => {
  todo.toggleDoneStatus();
};

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
  "Study",
  2
);
const taks3 = createTodoItem(
  "Buy Ibuprofen",
  "Go to farmacity they have 2x1",
  "05-10-25",
  "Health",
  1
);
const taks4 = createTodoItem(
  "Call Thom",
  "Or maybe text him to meet up",
  "05-10-25",
  "Work",
  1
);

addNewTodo(taks1);
addNewTodo(taks2);
addNewTodo(taks3);
addNewTodo(taks4);

export function log() {
  console.log(todoTasksList);
  console.log(todoCategoriesList);

  addCategory("Travel");
  addCategory("Work");
  console.log(todoCategoriesList);
  console.log(todoTasksList[0].done);
  console.log(markTodoAsCompleted(todoTasksList[0]));
  console.log(todoTasksList[0].done);
  console.log(todoTasksList);
  console.log(taskCategoryCounter);
}
