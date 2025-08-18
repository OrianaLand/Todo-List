import "./styles.css";

import { logAgain } from "./todoDOM.js";
import { renderAllTasks } from "./todoDOM.js";
import { renderAllCategories } from "./todoDOM.js";
import { renderCompletedTasks } from "./todoDOM.js";

logAgain();

renderAllCategories(); //on page load
renderCompletedTasks(); // Action for Completed li button listener
renderAllTasks(); //Action for All tasks li button listener
