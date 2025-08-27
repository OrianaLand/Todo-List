class Todo {
  constructor(title, description, dueDate, category, priority) {
    this._title = title;
    this.description = description;
    this.dueDate = this.#parseLocalDate(dueDate);
    this.category = category;
    this.priority = priority;
    this.done = false;
    this.id = crypto.randomUUID();
  }

  //helper funtion to store Date object in local time ARG (UTC-3)
  #parseLocalDate(dateStr) {
    if (dateStr instanceof Date) return dateStr; // safety check
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  set title(newTitle) {
    if (!newTitle) {
      console.log("Titlle can't be empty");
    } else {
      this._title = newTitle;
    }
  } //Test setter

  toggleDoneStatus() {
    this.done = !this.done;
  }
}

export default Todo;
