import { useState, useEffect } from "react";
import Question from "./components/Question";
import Timer from "./components/Timer";
import StartGame from "./components/StartGame";

function App() {
  const [questionData, setQuestionData] = useState("");
  const [timeLeft, setTimeLeft] = useState(59);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
    .then(res => res.json())
    .then(data => setQuestionData((questionData) => questionData = data));
  }, [])

  console.log(questionData);

  return (
    <div className="App">
      {!startGame ? <StartGame startGame={startGame} onStart={setStartGame} /> : ""}
      <div id="question-timer-container">
        {startGame ? <Question question={"test"} /> : ""}
        {startGame ? <Timer timeLeft={timeLeft} /> : ""}
      </div>
    </div>
  );
}

export default App;
