import "./styles.css";

import { logAgain } from "./todoDOM.js";
import { renderAllTasks } from "./todoDOM.js";
import { renderDynamicCategories } from "./todoDOM.js";
import { renderCompletedTasks } from "./todoDOM.js";
import { renderTasksByCategory } from "./todoDOM.js";
import { renderTodayTasks } from "./todoDOM.js";

logAgain();

renderDynamicCategories(); //on page load
renderCompletedTasks(); // Action for Completed li button listener
renderTasksByCategory("Health"); //Action for each dynamic category button listener. Call function with category-name inner text
renderAllTasks(); //Action for All tasks li button listener
renderTodayTasks();
