import { useState, useEffect, useRef } from "react";
import axios from "axios";

function JoinScreen({ questionList }) {
  const [categories, setCategories] = useState([]);

  const categoryElement = useRef();
  const amountElement = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((response) => {
      setCategories(response.data.trivia_categories);
    });
  }, []);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountElement.current.value,
          category: categoryElement.current.value,
        },
      })
      .then((response) => {
        questionList(
          response.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }

  return (
    <div id="join-screen">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category</label>
          <select name="category" id="category" ref={categoryElement}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min="1"
            step="1"
            defaultValue={10}
            ref={amountElement}
          />
        </div>

        <div>
          <button>Start</button>
        </div>
      </form>
    </div>
  );
}

export default JoinScreen;
