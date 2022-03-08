import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";

function Question({ question, totalQuestions, currentQuestion, setAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const timer = useRef(null);
  const progressBar = useRef(null);

  function goToNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    flushSync(() => {
      setAnswer(selectedOption);
    });
    setAnswer(selectedOption);
    setSelectedOption(null);
  }

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  useEffect(() => {
    progressBar.current.classList.remove("active");
    setTimeout(() => {
      progressBar.current.classList.add("active");
    }, 0);
    timer.current = setTimeout(goToNextQuestion, 10 * 1000);
    return goToNextQuestion;
  }, [question]);

  return (
    <div id="question">
      <div className="progress-bar" ref={progressBar}></div>
      <div className="question-count">
        {currentQuestion} of {totalQuestions}
      </div>
      <div>
        <div>
          <span>Question :</span>
          <p>{question.question}</p>
        </div>

        <div>
          {question.options.map((option, index) => {
            return (
              <div
                className={
                  index === selectedOption ? "option active" : "option"
                }
                key={index}
                onClick={() => setSelectedOption(index)}
              >
                {option}
              </div>
            );
          })}
        </div>

        <div className="answer-section">
          {question.options.map((option) => (
            <button onClick={() => handleAnswerOptionClick(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button onClick={goToNextQuestion}>Next</button>
      </div>
    </div>
  );
}

export default Question;
