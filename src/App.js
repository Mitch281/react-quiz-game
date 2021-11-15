import { useState } from "react";
import Question from "./components/Question";
import Timer from "./components/Timer";
import StartGame from "./components/StartGame";

function App() {
  const [question, setQuestion] = useState([
    {
      id: 0,
      questionText: "What is 1+1?",
      options: {1: "option1", 2:"option2", 3:"option3", 4:"option4"},
      answer: "option2"
    }
  ]);

  const [timeLeft, setTimeLeft] = useState(59);
  const [startGame, setStartGame] = useState(false);

  //fetch("https://opentdb.com/api.php?amount=10").then(res => res.json()).then((data);


  return (
    <div className="App">
      {!startGame ? <StartGame startGame={startGame} onStart={setStartGame} /> : ""}
      <div id="question-timer-container">
        {startGame ? <Question question={question[0].questionText} /> : ""}
        {startGame ? <Timer timeLeft={timeLeft} /> : ""}
      </div>
    </div>
  );
}

export default App;
