import React, { useState } from "react";
import "../AddModal/AddModal.scss";

function AddModal({ isVisible, setVisible, setData, data }) {
  const [newData, setNewData] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewData((prev) => ({ ...prev, [name]: value }));
  };

  async function addData() {
    try {
      let resp = await fetch(`http://localhost:4000/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newData),
      });

      if (resp.ok) {
        console.log(data);
        setData([...data, newData]);
        alert("Данные добавлены");
      }
    } catch (err) {
      alert(err);
    }
  }
  return (
    <div className={`addModal ${isVisible ? "visible" : ""}`}>
      <div className="window">
        <svg
          onClick={() => {
            setVisible(false);
          }}>
          <use xlinkHref="/icons.svg#close" />
        </svg>
        <h2>Добавление заседания</h2>
        <div className="addForm">
          <label>
            Дата:
            <input type="date" name="date" onChange={handleInputChange} />
          </label>

          <label>
            Название дела:
            <input type="text" name="title" onChange={handleInputChange} />
          </label>
          <label>
            Время:
            <input type="text" name="time" onChange={handleInputChange} />
          </label>
          <label>
            Адрес:
            <input type="text" name="location" onChange={handleInputChange} />
          </label>
          <div className="btns">
            <button className="save" onClick={addData}>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
