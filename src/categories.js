export class Category {
  constructor(id, title, items) {
    this.id = id;
    this.title = title;
    this.items = items || [];
  }
}
