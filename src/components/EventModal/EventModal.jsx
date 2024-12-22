import React, { useState } from "react";
import "./EventModal.scss";

function EventModal({
  data,
  isVisible,
  day,
  currentDate,
  setVisible,
  setData,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    date: "",
    time: "",
    title: "",
    location: "",
  });
  const [currentEventIndex, setCurrentEventIndex] = useState(null);

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const handleClick = async (event) => {
    setIsEditing(true);
    setEditedEvent({
      date: event.date,
      time: event.time,
      title: event.title,
      location: event.location,
    });
    setCurrentEventIndex(event.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({ ...prev, [name]: value }));
  };

  async function updateData() {
    try {
      let respUpdate = await fetch(
        `http://localhost:4000/meetings/${currentEventIndex}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(editedEvent),
        }
      );
      if (respUpdate.ok) {
        let resp = await fetch("http://localhost:4000/meetings");
        if (resp.ok) {
          let res = await resp.json();
          setData(res);
          alert("Данные обновлены");
        }
      }
    } catch (err) {
      alert(err);
    }
  }

  async function deleteData(event) {
    try {
      let resp = await fetch(`http://localhost:4000/meetings/${event.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      if (resp.ok) {
        let resp = await fetch("http://localhost:4000/meetings");
        if (resp.ok) {
          let res = await resp.json();
          setData(res);
          alert("Данные удалены");
        } else {
          alert("Возникили проблемы при удалении");
        }
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className={`eventModal ${isVisible ? "visible" : ""}`}>
      <div className="window">
        <svg
          onClick={() => {
            setVisible(false);
          }}>
          <use xlinkHref="/icons.svg#close" />
        </svg>

        <h2>{`Заседания ${day} ${months[currentDate.getMonth()]}`}</h2>

        {isEditing ? (
          <div className="editForm">
            <label>
              Название:
              <input
                type="text"
                name="title"
                value={editedEvent.title}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Время:
              <input
                type="text"
                name="time"
                value={editedEvent.time}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Адрес:
              <input
                type="text"
                name="location"
                value={editedEvent.location}
                onChange={handleInputChange}
              />
            </label>
            <div className="btns">
              <button className="save" onClick={updateData}>
                Сохранить
              </button>
              <button onClick={() => setIsEditing(false)}>Отменить</button>
            </div>
          </div>
        ) : (
          <>
            {data.length > 0
              ? data.map((val) => {
                  return (
                    <div className="meeting">
                      <div className="controls">
                        <svg onClick={() => handleClick(val)}>
                          <use xlinkHref="/icons.svg#edit" />
                        </svg>
                        <svg onClick={() => deleteData(val)}>
                          <use xlinkHref="/icons.svg#del" />
                        </svg>
                      </div>
                      <p className="title">{val.title}</p>
                      <div>
                        <p>Время: {val.time}</p>
                        <p>Адрес: {val.location}</p>
                      </div>
                    </div>
                  );
                })
              : "Нет заседаний"}
          </>
        )}
      </div>
    </div>
  );
}

export default EventModal;
