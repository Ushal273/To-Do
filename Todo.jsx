// Todo.jsx
import { useState, useEffect, useRef } from "react";
import "./CSS/Todo.css";
import { Todoitem } from "./Todoitem";

let count = 0;

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count", count);
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
      count = localStorage.getItem("todos_count");
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="todo-input"
        />
        <div onClick={add} className="todo-add-btn">
          ADD
        </div>
      </div>
      
      <div className="todo-list">
        {todos.map((item, index) => (
          <Todoitem
            key={index}
            setTodos={setTodos}
            no={item.no}
            display={item.display}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
