import { useState } from "react";

import "./App.scss";

import Header from "./components/Header";
import Footer from "./components/Footer";
import QuizScreen from "./components/Quiz/QuizScreen";
import JoinScreen from "./components/Quiz/JoinScreen";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizList, setQuizList] = useState([]);
  const generatedQuizList = (data) => {
    setQuizList(data);
    setIsQuizStarted(true);
  };

  return (
    <div id="app">
      <Header />
      <main>
        <h1>Quiz Game</h1>

        {isQuizStarted ? (
          <QuizScreen
            retry={() => setIsQuizStarted(false)}
            questionList={quizList}
          />
        ) : (
          <JoinScreen questionList={generatedQuizList} />
        )}
      </main>
      <Footer />
    </div>
  );
}
export default App;
