import React from "react";

const Scores = ({ scores }) => {
  return (
    <div className="scores__container">
      <div>
        <h1>Scores</h1>

        {scores.map((e, index) => (
          <div key={index} >
            <br />
            <h3>
              {index + 1} {e}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scores;
