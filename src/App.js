import "./App.scss";
import Calendar from "./components/Calendar/Calendar";
import AddModal from "./components/AddModal/AddModal";
import React, { useEffect, useState } from "react";

function App() {
  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      let resp = await fetch("http://localhost:4000/meetings");
      if (!resp.ok) {
        throw new Error("Response was not ok");
      }
      let res = await resp.json();
      setData(res);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => fetchData, []);

  return (
    <div className="App">
      <div class="wrap">
        <button
          className="addBtn"
          onClick={() => {
            setVisible(true);
          }}>
          <svg>
            <use xlinkHref="/icons.svg#add" />
          </svg>
          Добавить
        </button>
      </div>
      <Calendar data={data} setData={setData} />
      {isVisible && (
        <AddModal
          isVisible={isVisible}
          setVisible={setVisible}
          setData={setData}
          data={data}
        />
      )}
    </div>
  );
}

export default App;
