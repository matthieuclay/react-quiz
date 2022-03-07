import React, { useState } from "react";

function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  return (
    <div
      id="flashcard"
      className={`${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front">
        {flashcard.question}
        <div className="options">
          {flashcard.options.map((option) => {
            return (
              <div className="option" key={option}>
                {option}
              </div>
            );
          })}
        </div>
      </div>

      <div className="back">{flashcard.answer}</div>
    </div>
  );
}

export default Flashcard;
