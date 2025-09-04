import Todo from "./todoItem.js";
import { Category } from "./categories.js";

export class TodoStorage {
  static STORAGE_KEYS = {
    TASKS: "todo_app_tasks",
    CATEGORIES: "todo_app_categories",
    CURRENT_VIEW: "todo_app_current_view",
  };

  //Save Data to localStorage
  static saveTasksToStorage(tasks) {
    try {
      //convert tasks into plain objects array
      const serializedTasks = tasks.map((task) => ({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.toISOString(), //convert Date to String
        category: task.category,
        priority: task.priority,
        done: task.done,
        id: task.id,
      }));
      //Serialize
      localStorage.setItem(
        this.STORAGE_KEYS.TASKS,
        JSON.stringify(serializedTasks)
      );
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
    }
  }

  static saveCategoriesToStorage(categories) {
    try {
      const serializedCategories = categories.map((cat) => ({
        id: cat.id,
        title: cat.title,
        //Items array will be rebuilt from tasks
      }));
      localStorage.setItem(
        this.STORAGE_KEYS.CATEGORIES,
        JSON.stringify(serializedCategories)
      );
    } catch (error) {
      console.error("Failed to save current view:", error);
    }
  }

  static saveCurrentView(view) {
    try {
      localStorage.setItem(this.STORAGE_KEYS.CURRENT_VIEW, view);
    } catch (error) {
      console.error("Failed to save current view:", error);
    }
  }

  //Load data from localStorage
  static loadTasksFromStorage() {
    try {
      const tasksStored = localStorage.getItem(this.STORAGE_KEYS.TASKS);
      if (!tasksStored) return [];

      //Deserialize
      const tasksParsed = JSON.parse(tasksStored);
      if (!Array.isArray(tasksParsed)) return [];

      //Reconstruct Todo objects with methods
      return tasksParsed.map((taskData) => {
        const todo = new Todo(
          taskData.title,
          taskData.description,
          taskData.dueDate, //The constructor will parse this
          taskData.category,
          taskData.priority
        );

        //Restore the original ID and done Status
        todo.done = taskData.done;
        todo.id = taskData.id;

        return todo;
      });
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
      return [];
    }
  }

  static loadCategoriesFromStorage() {
    try {
      const categoriesStored = localStorage.getItem(
        this.STORAGE_KEYS.CATEGORIES
      );
      if (!categoriesStored) return [];

      const categoriesParsed = JSON.parse(categoriesStored);
      if (!Array.isArray(categoriesParsed)) return [];

      //Reconstruc Categorie objects
      return categoriesParsed.map(
        (catData) => new Category(catData.id, catData.title, [])
      );
    } catch (error) {
      console.error("Failed to load categories from localStorage:", error);
      return [];
    }
  }

  static loadCurrentView() {
    try {
      return localStorage.getItem(this.STORAGE_KEYS.CURRENT_VIEW) || "all";
    } catch (error) {
      console.error("Failed to load current view:", error);
      return "all";
    }
  }

  //Clear all data (this is for testing purposes)
  static clearAllData() {
    try {
      Object.values(this.STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
      localStorage.clear();
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  }

  // Check if localStorage is available
  static isStorageAvailable() {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }
}
