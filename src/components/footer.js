import React from "react";
import "../App.css";

export default function Footer ({filter}) {
  const handleOnClick = (action) => {
    if (action === "All") {
      filter("All");
    }
    if (action === "Active") {
      filter("Active");
    }
    if (action === "Done") {
      filter("Done");
    }
  }
  return (
    <div className="todo-container">
      <div className="filter-container">
        <div onClick={() => handleOnClick("All")}>All </div>
        <div onClick={() => handleOnClick("Active")}>Active </div>
        <div onClick={() => handleOnClick("Done")}>Done</div>
      </div>
    </div>
  );
}
