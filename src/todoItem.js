class Todo {
  constructor(title, description, dueDate, category, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = this.#parseLocalDate(dueDate);
    this.category = category;
    this.priority = priority;
    this.done = false;
    this.id = crypto.randomUUID();
  }

  //helper funtion to store Date object in local time ARG (UTC-3)
  #parseLocalDate(dateStr) {
    if (dateStr instanceof Date) return dateStr; // already a Date object
    if (!dateStr) return null;

    // Try ISO string
    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate)) return parsedDate;

    // Fallback: YYYY-MM-DD format
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  toggleDoneStatus() {
    this.done = !this.done;
    console.log("status toggled");
  }

  editTodo(title, description, dueDate, category, priority, id) {
    this.title = title;
    this.description = description;
    this.dueDate = this.#parseLocalDate(dueDate);
    this.category = category;
    this.priority = priority;
    this.id = id;
  }
}

export default Todo;
