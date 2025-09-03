import Todo from "./todoItem.js";
import { Category } from "./categories.js";
import { TodoStorage } from "./todoStorage.js";
import { format, isToday, isSameWeek } from "date-fns";

class TaskCategoryManager {
  constructor() {
    this.categories = [];
    this.allTasks = []; // preserve global order
    this.addCategory("General"); //Default Project
  }

  #saveToStorage() {
    TodoStorage.saveTasksToStorage(this.allTasks);
    TodoStorage.saveCategoriesToStorage(this.categories);
  }

  #addSampleData() {
    const sampleTodos = [
      {
        title: "Your title goes here",
        description: "Then I add a short description",
        dueDate: "2025-09-27",
        category: "General",
        priority: 1,
      },
      {
        title: "Get hair cut",
        description: "Check their calendar first",
        dueDate: "2025-10-15",
        category: "Personal",
        priority: 2,
      },
    ];

    sampleTodos.forEach((todo) => {
      const newTodo = new Todo(
        todo.title,
        todo.description,
        todo.dueDate,
        todo.category,
        todo.priority
      );
      this.addTask(newTodo);
    });
  }

  #formatId(category) {
    let id = category.toLowerCase().replace(/\s+/g, "-");
    if (!id.endsWith("-tasks")) {
      id = `${id}-tasks`;
    }
    return id;
  }

  formatDate(date) {
    return format(date, "dd MMM yyyy");
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
    return this.getAllTasks().filter((task) => isToday(task.dueDate));
  }

  getThisWeekTasks() {
    const today = new Date();
    return this.getAllTasks().filter((task) =>
      isSameWeek(task.dueDate, today, { weekStartsOn: 1 })
    );
  }

  getCompletedTasks() {
    return this.getAllTasks().filter((task) => task.done);
  }

  getTaskById(id) {
    return this.allTasks.find((task) => task.id === id);
  }
}

function removeTaskFromCategory(task) {
  const catId = task.category.toLowerCase().replace(/\s+/g, "-") + "-tasks";
  const catIndex = tasksManager.categories.findIndex((cat) => cat.id === catId);

  if (catIndex >= 0) {
    tasksManager.categories[catIndex].items = tasksManager.categories[
      catIndex
    ].items.filter((t) => t.id !== task.id);
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

export const editTodo = (title, description, date, category, priority, id) => {
  const task = tasksManager.getTaskById(id);
  const currentCat = task.category; //current category
  if (!task) return;
  if (currentCat !== category) {
    removeTaskFromCategory(task);
    task.editTodo(title, description, date, category, priority, id);
    tasksManager.addTask(task);
  }
  task.editTodo(title, description, date, category, priority, id);
};

export const deleteTodo = (taskId) => {
  const task = tasksManager.getTaskById(taskId);
  if (!task) return;

  // Remove from category array
  removeTaskFromCategory(task);

  // Remove from allTasks
  tasksManager.allTasks = tasksManager.allTasks.filter((t) => t.id !== taskId);
};

export const deleteCategory = (categoryId, categoryTitle) => {
  const category = tasksManager.categories.find((cat) => cat.id === categoryId);
  if (!category) return;

  //Remove todos from allTasks
  tasksManager.allTasks = tasksManager.allTasks.filter(
    (t) => t.category !== categoryTitle
  );

  //Remove from category and its todos from category array
  tasksManager.categories = tasksManager.categories.filter(
    (cat) => cat.id !== categoryId
  );
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
