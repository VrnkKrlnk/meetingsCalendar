import React from "react";
import "./Calendar.scss";
import DayCell from "../DayCell/DayCell.jsx";

function Calendar() {
  let now = new Date();
  let dayInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  let dayStartMonth = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

  const days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const emptyCells = [];
  if (dayStartMonth === 0) {
    for (let i = 0; i < 6; i++) {
      emptyCells.push(0);
    }
  } else {
    for (let i = 0; i < dayStartMonth; i++) {
      emptyCells.push(0);
    }
  }

  const daysInMonth = [...emptyCells];
  for (let i = 1; i <= dayInMonth; i++) {
    daysInMonth.push(i);
  }

  return (
    <div className="calendar">
      <p>{`${months[now.getMonth()]}, ${now.getFullYear()}`}</p>
      <div className="header">
        {days.map((val) => {
          return <DayCell day={val} />;
        })}
      </div>

      <div className="cells">
        {daysInMonth.map((val) => {
          return <DayCell day={val} />;
        })}
      </div>
    </div>
  );
}

export default Calendar;
