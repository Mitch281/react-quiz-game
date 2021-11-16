import { useState, useEffect } from "react";
import Question from "./components/Question";
import Timer from "./components/Timer";
import StartGame from "./components/StartGame";

function App() {
  const [questionData, setQuestionData] = useState("");
  const [timeLeft, setTimeLeft] = useState(59);
  const [startGame, setStartGame] = useState(false);
  let dataLoaded = false;

  // Fetch questions and answers from api.
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
    .then(res => res.json())
    .then(data => setQuestionData(data));
  }, [])

  // Check if we have successfully loaded our question data from api. If not, do not render components yet!
  if (questionData !== "") {
    dataLoaded = true;
    console.log(questionData);
  }

  return (
    <div className="App">
      {!startGame ? <StartGame startGame={startGame} onStart={setStartGame} /> : ""}
      <div id="question-timer-container">
        {startGame && dataLoaded ? <Question question={questionData.results[0].question} /> : ""}
        {startGame && dataLoaded ? <Timer timeLeft={timeLeft} /> : ""}
      </div>
    </div>
  );
}

export default App;
