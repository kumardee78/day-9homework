import { useEffect, useState } from "react";
import { LuDot } from "react-icons/lu";

function App() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const fetchQuestions = () => {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        if (data.response_code == 0) {
          setQuestions(data.results);
          console.log(data.results);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  function validateAnswer(correct) {
    if (correct) {
      setScore(score + 1);
    }
    if (index <= 9) setIndex(index + 1);
  }

  return (
    <div className="w-[50%] mx-auto  my-24 shadow-xl">
      {index <= 9 ? (
        <div className="">
          <h1 className="text-3xl text-center bg-red-400 text-white py-2">
            Quiz App{" "}
          </h1>
          <h2 className="pt-6 pb-2 px-6 font-semibold">Question : {index + 1}</h2>
          {questions.length > 0 ? (
            <div className="px-6">
              <p>{questions[index].question}</p>

              {questions[index].incorrect_answers.map((item, ind) => (
                <p
                  onClick={() => validateAnswer(false)}
                  key={ind}
                  className="flex items-center pr-2 cursor-pointer"
                >
                  <LuDot />
                  {item}
                </p>
              ))}
              <p onClick={() => validateAnswer(true)} className="flex items-center pr-2 cursor-pointer">
                <LuDot />
                {questions[index].correct_answer}
              </p>
              <p style={{ display: "none" }}>
                {" "}
                {setTimeout(() => setIndex(index + 1), 5000)}
              </p>
            </div>
          ) : null}

          <br />
          <button
            onClick={() => setIndex(index + 1)}
            className="bg-red-200 py-2 px-4 rounded-xl my-2 mx-6"
          >
            Skip Question
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl text-center font-semibold">Quiz is Over</h1>
          <p className="py-6 px-6">Score is : {score}/10</p>
        </div>
      )}
    </div>
  );
}

export default App;
