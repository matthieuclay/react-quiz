function QuizResult({ result, retry }) {
  return (
    <div id="quiz-result">
      <h2>Result : {result.percentage}%</h2>
      <p>
        Selected {result.correct} correct options out of {result.total}{" "}
        questions.
      </p>
      <button onClick={retry}>Retry</button>
    </div>
  );
}

export default QuizResult;
