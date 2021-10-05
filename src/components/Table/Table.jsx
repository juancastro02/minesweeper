import React, { useEffect, useState } from "react";
import Mines from "../Mines/Mines";

const Table = ({ level, tableRef, setFlag, flag, scores }) => {

  const [mines, setMines] = useState([]);
  const [lose, setLose] = useState(false);

  const createBomb = () => {
    return Math.floor(Math.random() * level);
  }; 

  const createNumber = () => {
    return Math.floor(Math.random() * 4);
  };

  const bombShow = () => {
    let minas = mines;
    for (let i = 0; i < minas.length; i++) {
      for (let j = 0; j < minas[i].length; j++) {
        minas[i][j].press = false;
        if (minas[i][j].bomb) {
          minas[i][j].open = true;
        }
      }
    }

    setMines(minas);

    scores.push("Lose");

    localStorage.setItem("scores", JSON.stringify(scores));

    setLose(true);
  };

  const handleCreate = () => {
    const tableR = tableRef.current;

    if (level === 10) {
      tableR.className = "table table__easy";
    } else if (level === 20) {
      tableR.className = "table table__intermediate mb-10";
    } else {
      tableR.className = "table table__expert mb-10";
    }

    let bomb = createBomb();

    let table = [];
    for (let i = 0; i < level; i++) {
      let row = [];
      for (let j = 0; j < level; j++) {
        let value = createNumber();
        let isActive = false;

        if (bomb === j) {
          isActive = true;
          value = null;
        }

        row.push({
          open: false,
          bomb: isActive,
          press: true,
          value: value,
          swap: false,
          row: i,
          col: j,
        });

        if (j === level - 1) {
          table.push(row);
          row = [];
          bomb = createBomb();
        }
      }
    }

    setMines(table);
  };

  useEffect(() => {
    handleCreate();
  }, []);

  return (
    <div>
      <div className="table table__easy " ref={tableRef}>
        {mines.map((mine) =>
          mine.map((e) => (
            <div
              key={JSON.stringify(e.row) + JSON.stringify(e.col)}
              className="mines"
            >
              <Mines
                scores={scores}
                flag={flag}
                setFlag={setFlag}
                mine={e}
                bombShow={bombShow}
                lose={lose}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
