// Todoitem.jsx
import React from "react";
import "./CSS/Todoitem.css";
import tick from "./Assets/tick.png";
import cross from "./Assets/cross.png";
import not_tick from "./Assets/not_tick.png";

export const Todoitem = ({ no, display, text, setTodos }) => {
  const toggle = () => {
    
    //Store Data
    let data = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].no === no) {
        if (data[i].display === "") {
          data[i].display = "line-through";
        } else {
          data[i].display = "";
        }
        break;
      }
    }
    setTodos(data);
  };

  //Delete Item
  const deleteTodo = () => {
    let newData = JSON.parse(localStorage.getItem("todos")).filter(
      (item) => item.no !== no
    );
    setTodos(newData);
  };

  return (
    <div className="todoitems">
      <div className={`todoitems-container ${display}`} onClick={() => toggle(no)}>
        {display === "" ? <img src={not_tick} alt="" /> : <img src={tick} alt="" />}
        <div className="todoitems-text">{text}</div>
      </div>
      <img
        className="todoitems-crossicon"
        src={cross}
        alt=""
        onClick={deleteTodo}
      />
    </div>
  );
};
