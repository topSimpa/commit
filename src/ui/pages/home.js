//home.js
//home pages tab are displayed using this module
import "./home.css";
import displayTodoList from "../utils/displayTodoList.js";


export default function home(todoList, title, description) {
    const home = document.createElement("div");
    const homeTitle = document.createElement("p");
    const homeDescription = document.createElement("p");

    home.classList = "home";
    homeTitle.classList = "home-title";
    homeDescription.classList = "home-description"
    homeTitle.textContent = title;
    homeDescription.textContent = description;

    const list = displayTodoList(todoList);

    home.append(homeTitle, homeDescription, list)
    
    return home;
}
