import { useState } from "react";
import Question from "./Question";
import QuizResult from "./QuizResult";

function QuizScreen({ retry, questionList }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(questionList.length)
  );
  const isQuestionEnd = currentQuestionIndex === questionList.length;

  function calculateResult() {
    let correct = 0;
    questionList.forEach((question, index) => {
      if (question.answer === markedAnswers[index]) {
        correct++;
      }
    });
    return {
      total: questionList.length,
      correct: correct,
      percentage: Math.trunc((correct / questionList.length) * 100),
    };
  }

  return (
    <div id="quiz-screen">
      <div>
        {isQuestionEnd ? (
          <QuizResult result={calculateResult()} retry={retry} />
        ) : (
          <Question
            question={questionList[currentQuestionIndex]}
            totalQuestions={questionList.length}
            currentQuestion={currentQuestionIndex + 1}
            setAnswer={(index) => {
              setMarkedAnswers((arr) => {
                let newArr = [...arr];
                newArr[currentQuestionIndex - 1] = index;
                return newArr;
              });
              setCurrentQuestionIndex(currentQuestionIndex + 1);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default QuizScreen;
