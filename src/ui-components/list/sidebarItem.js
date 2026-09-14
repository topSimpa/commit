// addToSidebar.js
import "./sidebarItems.css";


//collect data , data should type to denote the type of button
function sidebarItem({
    itemTitle,
    itemIcon = "",
}) {
    const sidebarItem = document.createElement("li");
    const button = document.createElement("button");
    const icon  = document.createElement("span");
    const title = document.createElement("span");
    
    const titleLength = itemTitle.length;

    sidebarItem.classList.add("sidebar-item");
    button.classList.add("sidebar-button");
    icon.classList.add("view-icon");
    title.classList.add("sidebar-text");
    title.classList.add("view-title");

    title.textContent = itemTitle;
    
    if (itemIcon) {
        icon.classList.add("material-symbols-outlined");
        icon.textContent = itemIcon;
    } else {
        icon.textContent = itemTitle[0] + itemTitle[titleLength - 1];
        icon.classList.add("circle-icon");
    }
    
    button.append(icon, title);
    sidebarItem.append(button);

    return sidebarItem;
}

export default sidebarItem;