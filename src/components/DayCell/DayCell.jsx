import React from "react";
import "./DayCell.scss";

function DayCell({ day, month = "", data = false }) {
  return (
    <div
      className={`cell ${day === 0 ? "none" : ""} ${
        day === new Date().getDate() && new Date().getMonth() === month
          ? "current"
          : ""
      } ${data ? "meeting" : ""}`}>
      {day}
    </div>
  );
}

export default DayCell;
