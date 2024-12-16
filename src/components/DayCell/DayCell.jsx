import React from "react";
import "./DayCell.scss";

function DayCell({ day, month = "" }) {
  return (
    <div
      className={`cell ${day === 0 ? "none" : ""} ${
        day === new Date().getDate() && new Date().getMonth() === month
          ? "current"
          : ""
      }`}>
      {day}
    </div>
  );
}

export default DayCell;
