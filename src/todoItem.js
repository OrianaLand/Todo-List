class Todo {
  constructor(title, description, dueDate, category, priority) {
    this._title = title;
    this.description = description;
    this.dueDate = new Date(dueDate);
    this.category = category;
    this.priority = priority;
    this.done = false;
    this.id = crypto.randomUUID();
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
