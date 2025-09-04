import Todo from "./todoItem.js";
import { Category } from "./categories.js";
import { TodoStorage } from "./todoStorage.js";
import { format, isToday, isSameWeek, isValid } from "date-fns";

class TaskCategoryManager {
  constructor() {
    this.categories = [];
    this.allTasks = []; // preserve global order
    this.DEFAULT_CATEGORY = "General";

    this.#initializeData();
  }

  #initializeData() {
    const storedCategories = TodoStorage.loadCategoriesFromStorage();
    const storedTasks = TodoStorage.loadTasksFromStorage();

    if (storedCategories && storedTasks) {
      //Load existing data
      this.categories = storedCategories;
      this.allTasks = storedTasks;

      //Always ensure General category exists
      this.#ensureGeneralCategory();
      this.#rebuildCategoryItemsArray();
      console.log("Data loaded from localStorage");
    } else {
      this.#ensureGeneralCategory();
      this.#addSampleData();
      console.log("Initialized with default Data");
    }
  }

  #rebuildCategoryItemsArray() {
    this.categories.forEach((cat) => (cat.items = []));

    this.allTasks.forEach((task) => {
      const categoryId = this.#formatId(task.category);
      let category = this.categories.find((cat) => cat.id === categoryId);

      //If task category doesn't exist, move it to General category
      if (!category) {
        console.warn(
          `Category ${task.category} not found, moving task to General`
        );
        task.category = this.DEFAULT_CATEGORY;
        category = this.categories.find(
          (cat) => cat.id === this.#formatId(this.DEFAULT_CATEGORY)
        );
      }

      if (category) {
        category.items.push(task);
      }
    });
  }

  #ensureGeneralCategory() {
    const generalId = this.#formatId(this.DEFAULT_CATEGORY);
    const generalExists = this.categories.find((cat) => cat.id === generalId);

    if (!generalExists) {
      const generalCategory = new Category(generalId, this.DEFAULT_CATEGORY);
      this.categories.unshift(generalCategory);
      console.log("Added missing General category");
    } else {
      // Ensure it's always first
      const generalIndex = this.categories.indexOf(generalExists);
      if (generalIndex > 0) {
        this.categories.splice(generalIndex, 1); // remove from current spot
        this.categories.unshift(generalExists); // move to front
      }
    }
  }

  #saveToStorage() {
    TodoStorage.saveTasksToStorage(this.allTasks);
    TodoStorage.saveCategoriesToStorage(this.categories);
  }

  #addSampleData() {
    const sampleTodos = [
      {
        title: "Your title goes here",
        description: "Then you add a short description",
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

    this.#saveToStorage();
  }

  addCategory(category) {
    const id = this.#formatId(category);

    // check if category already exists
    const existing = this.categories.find((cat) => cat.id === id);
    if (existing) {
      return existing;
    }
    const newCategory = new Category(id, category);

    // Add it at the end to keep user-defined order
    this.categories.push(newCategory);

    // Always make sure General exists
    this.#ensureGeneralCategory();

    // Persist to storage
    this.#saveToStorage();

    return newCategory;
  }

  deleteTask(taskId) {
    const task = this.allTasks.find((t) => t.id === taskId);
    if (!task) return false;

    const categoryId = this.#formatId(task.category);
    const category = this.categories.find((cat) => cat.id === categoryId);

    //Remove from category
    if (category) {
      category.items = category.items.filter((t) => t.id !== taskId);
    }

    //Remove from all tasks
    this.allTasks = this.allTasks.filter((t) => t.id !== taskId);

    this.#saveToStorage();
    return true;
  }

  deleteCategory(categoryId, categoryTitle) {
    // Protect General category from deletion
    if (categoryTitle === this.DEFAULT_CATEGORY) {
      console.warn("Cannot delete default General category");
      return false;
    }

    const category = this.categories.find((cat) => cat.id === categoryId);
    if (!category) return false;

    // Remove all tasks that belong to this category
    this.allTasks = this.allTasks.filter(
      (task) => task.category !== categoryTitle
    );

    // Remove the category itself
    this.categories = this.categories.filter((cat) => cat.id !== categoryId);

    // Rebuild category items to reflect the moved tasks
    this.#rebuildCategoryItemsArray();

    this.#saveToStorage();
    return true;
  }

  // Check if a category can be deleted
  canDeleteCategory(categoryTitle) {
    return categoryTitle !== this.PROTECTED_CATEGORY;
  }

  updateTask(taskId) {
    this.#saveToStorage();
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
  return tasksManager.deleteTask(taskId);
};

export const deleteCategory = (categoryId, categoryTitle) => {
  if (!tasksManager.canDeleteCategory(categoryTitle)) {
    alert(
      "The General category cannot be deleted as it's required by the system."
    );
    return false;
  }

  return tasksManager.deleteCategory(categoryId, categoryTitle);
};

/* addNewTodo(
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
); */
