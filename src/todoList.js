import Todo from "./todoItem.js";
import { Category } from "./categories.js";

class TaskCategoryManager {
  constructor() {
    this.categories = [];
    this.allTasks = []; // preserve global order
  }

  #formatId(category) {
    let id = category.toLowerCase().replace(/\s+/g, "-");
    if (!id.endsWith("-tasks")) {
      id = `${id}-tasks`;
    }
    return id;
  }

  #formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  addTask(task) {
    const id = this.#formatId(task.category);

    let category = this.categories.find((cat) => cat.id === id);

    if (!category) {
      category = this.addCategory(task.category);
    }

    category.items.push(task); //Add item to its category
    this.allTasks.push(task); // keep track of global insertion order
  }

  addCategory(category) {
    const id = this.#formatId(category);

    // check if category already exists
    const existing = this.categories.find((cat) => cat.id === id);
    if (existing) {
      return existing;
    }
    const newCategory = new Category(id, category);
    this.categories.push(newCategory);
    return newCategory;
  }

  getTasksByCategory(categoryTitle) {
    const id = this.#formatId(categoryTitle);
    const category = this.categories.find((cat) => cat.id === id);
    return category ? category.items : [];
  }

  getAllTasks() {
    return [...this.allTasks]; // Creates a shallow copy of the array before returning it.
  }

  getAllCategories() {
    return this.categories;
  }

  getTodayTasks() {
    const today = this.#formatDate(new Date());
    return this.getAllTasks().filter((task) => task.dueDate === today);
  }

  getCompletedTasks() {
    return this.getAllTasks().filter((task) => task.done);
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

export const addNewCategory = (category) => {
  try {
    tasksManager.addCategory(category);
  } catch (error) {
    console.error("Error adding new Project:", error);
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

export const deleteTodo = (taskId) => {
  const task = tasksManager.allTasks.find((t) => t.id === taskId);
  if (!task) return;

  // Remove from category array
  const key = task.category.toLowerCase().replace(/\s+/g, "-") + "-tasks";
  if (tasksManager.categories[key]) {
    tasksManager.categories[key] = tasksManager.categories[key].filter(
      (t) => t.id !== taskId
    );
  }

  // Remove from allTasks
  tasksManager.allTasks = tasksManager.allTasks.filter((t) => t.id !== taskId);
};

addNewTodo(
  "Download movie",
  "Cars II on plex/overseer",
  "2025-08-21",
  "Personal",
  1
);
addNewTodo(
  "Todo list from TOP",
  "Divide and conquer. From small to big",
  "2025-10-01",
  "Study",
  2
);
addNewTodo(
  "Buy Ibuprofen",
  "Go to farmacity they have 2x1",
  "2025-09-01",
  "Health",
  1
);
addNewTodo(
  "Call the supplier",
  "Get an updated list of prices",
  "2025-09-12",
  "Work",
  1
);
addNewTodo(
  "Dye hair",
  "get the dye at the pharmacy",
  "2025-08-30",
  "Personal",
  1
);
addNewTodo(
  "Therapy sesion",
  "talk with Dr Vera about psi med",
  "2025-08-21",
  "Health",
  1
);
