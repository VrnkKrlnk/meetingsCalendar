import React from "react";
import "./DayCell.scss";

function DayCell({ day, month = "", data = [] }) {
  return (
    <div
      className={`cell ${day === 0 ? "none" : ""} ${
        day === new Date().getDate() && new Date().getMonth() === month
          ? "current"
          : ""
      } ${
        data.some((val) => {
          let valDate = new Date(val.date);
          return day === valDate.getDate();
        })
          ? "meeting"
          : ""
      }`}>
      {day}
      {data.length > 0 ? (
        <div className="tooltip">
          <div>Заседания:</div>
          {data.map((val) => {
            return <div>{val.title}</div>;
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DayCell;
