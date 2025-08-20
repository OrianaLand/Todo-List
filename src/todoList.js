import Todo from "./todoItem.js";

class TaskCategoryManager {
  constructor() {
    this.categories = {};
  }

  #formatKey(category) {
    let key = category.toLowerCase().replace(/\s+/g, "-");
    if (!key.endsWith("-tasks")) {
      key = `${key}-tasks`;
    }
    return key;
  }

  #formatAllTasks() {
    const allTasks = { ...this.categories };
    return Object.values(allTasks).flat();
  }

  addTask(task) {
    const key = this.#formatKey(task.category);
    if (!this.categories[key]) {
      this.categories[key] = []; // initialize array if new category
    }
    this.categories[key].push(task);
  }

  getTasksByCategory(category) {
    const key = this.#formatKey(category);
    return this.categories[key] || [];
  }

  getAllTasks() {
    let allTasks = this.#formatAllTasks();
    return allTasks;
  }

  getAllCategories() {
    return Object.keys({ ...this.categories });
  }
}
export const tasksManager = new TaskCategoryManager();

export const createTodoItem = (
  title,
  description,
  dueDate,
  category,
  priority
) => {
  return new Todo(title, description, dueDate, category, priority);
};

export const addNewTodo = (title, description, date, category, priority) => {
  try {
    const newTodo = createTodoItem(
      title,
      description,
      date,
      category,
      priority
    );
    tasksManager.addTask(newTodo);
  } catch (error) {
    console.error("Error adding new Todo:", error);
    return null;
  }
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

export const markTodoAsCompleted = (todo) => {
  todo.toggleDoneStatus();
};

addNewTodo(
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
  "Study",
  2
);
addNewTodo(
  "Buy Ibuprofen",
  "Go to farmacity they have 2x1",
  "05-10-25",
  "Health",
  1
);
addNewTodo(
  "Call the supplier",
  "Get an updated list of prices",
  "05-10-25",
  "Work",
  1
);
addNewTodo(
  "Dye hair",
  "get the dye at the pharmacy",
  "08-30-2025",
  "Personal",
  1
);
addNewTodo(
  "Therapy sesion",
  "talk with Dr Vera about psi med",
  "08-20-25",
  "Health",
  1
);

export function log() {
  console.log(tasksManager.getAllCategories());
  console.log(tasksManager.getAllTasks());
}
