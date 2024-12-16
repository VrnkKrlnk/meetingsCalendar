import React from "react";
import "./DayCell.scss";

function DayCell({ day }) {
  return <div className={`cell ${day === 0 ? "none" : ""}`}>{day}</div>;
}

export default DayCell;
