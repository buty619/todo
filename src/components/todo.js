import React from "react";
import "../App.css";

export default function Todo({value:todo,onClick}) {
  return (
    <div
      className={`todo ${todo.done ? "done" : null}`}
      onClick={() => {
        onClick(todo.id);
      }}
    >
      {todo.text}
    </div>
  );
}
