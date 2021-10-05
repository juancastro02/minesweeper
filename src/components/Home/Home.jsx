import React, { useRef, useState } from "react";
import Scores from "../Scores/Scores";
import Table from "../Table/Table";

const Home = () => {
  const [level, setLevel] = useState(10);
  const [loading, setloading] = useState(false);
  const [flag, setFlag] = useState(level);

  const tableRef = useRef();

  const handleChangeLevel = (number) => {
    setloading(true);
    setLevel(number);
    setFlag(number);

    setTimeout(() => {
      setloading(false);
    }, 1000);
  };

  let scores = JSON.parse(localStorage.getItem("scores"))
    ? JSON.parse(localStorage.getItem("scores"))
    : [];

  return (
    <div className="home__flex">
      <div className="home__container">
        <h1 className="mb-10 mt-10">Minesweeper</h1>
        <div className="home__buttons">
          <button className="button" onClick={() => handleChangeLevel(10)}>
            Beginner
          </button>
          <button className="button" onClick={() => handleChangeLevel(20)}>
            Intermediate
          </button>
          <button className="button" onClick={() => handleChangeLevel(30)}>
            Expert
          </button>
        </div>
        <div className="home__game">
          <div className="home__game__squares home__game__squares--1">
            {flag}
          </div>
          <div
            className="home__game__squares home__game__squares--2"
            onClick={() => handleChangeLevel(level)}
          >
            Reset
          </div>
        </div>
        <div>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <Table
              scores={scores}
              tableRef={tableRef}
              level={level}
              setloading={setloading}
              flag={flag}
              setFlag={setFlag}
            />
          )}
        </div>
      </div>
      <div>
        <Scores scores={scores} />
      </div>
    </div>
  );
};

export default Home;
