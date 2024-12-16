import React, { useState } from "react";
import "./Calendar.scss";
import DayCell from "../DayCell/DayCell.jsx";

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  let dayInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  let dayStartMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

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
    for (let i = 1; i < dayStartMonth; i++) {
      emptyCells.push(0);
    }
  }

  const daysInMonth = [...emptyCells];
  for (let i = 1; i <= dayInMonth; i++) {
    daysInMonth.push(i);
  }

  const next = () => {
    let newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const prev = () => {
    let newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="calendar">
      <div className="panel">
        <button onClick={prev}>&lang;</button>
        <p>{`${
          months[currentDate.getMonth()]
        }, ${currentDate.getFullYear()}`}</p>
        <button onClick={next}>&rang;</button>
      </div>
      <div className="header">
        {days.map((val) => {
          return <DayCell day={val} />;
        })}
      </div>
      <div className="cells">
        {daysInMonth.map((val) => {
          return <DayCell day={val} month={currentDate.getMonth()} />;
        })}
      </div>
    </div>
  );
}

export default Calendar;
