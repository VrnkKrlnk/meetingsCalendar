import React, { useState } from "react";
import "./DayCell.scss";
import EventModal from "../EventModal/EventModal";

function DayCell({ day, currentDate, data = [], setData }) {
  const [isVisible, setVisible] = useState(false);

  function fillData(day) {
    return data.filter((val) => {
      let valDate = new Date(val.date);
      return (
        valDate.getFullYear() === currentDate.getFullYear() &&
        valDate.getMonth() === currentDate.getMonth() &&
        valDate.getDate() === day
      );
    });
  }

  return isVisible ? (
    <EventModal
      data={fillData(day)}
      isVisible={isVisible}
      day={day}
      currentDate={currentDate}
      setVisible={setVisible}
      setData={setData}
    />
  ) : (
    <div
      onClick={
        typeof day === "string"
          ? undefined
          : () => {
              setVisible(true);
            }
      }
      className={`${typeof day === "string" ? "header" : "cell"} ${
        day === 0 ? "none" : ""
      } ${
        day === new Date().getDate() &&
        new Date().getMonth() === currentDate.getMonth()
          ? "current"
          : ""
      } ${
        fillData(day).some((val) => {
          let valDate = new Date(val.date);
          return day === valDate.getDate();
        })
          ? "meeting"
          : ""
      }`}>
      {day}
      {fillData(day).length > 0 ? (
        <div className="tooltip">
          <div>Заседания:</div>
          {fillData(day).map((val) => {
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
