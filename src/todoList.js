import Todo from "./todoItem.js";

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
  if (todoCategoriesList.includes(categoryName)) {
    console.log(categoryName + " Already exists");
  } else {
    todoCategoriesList.push(categoryName);
  }
}; //This function might be removed in the future

export const markTodoAsCompleted = (todo) => {
  todo.toggleDoneStatus();
};
