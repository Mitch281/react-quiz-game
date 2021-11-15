import { useState } from "react";
import Question from "./components/Question";
import Timer from "./components/Timer";

function App() {
  const [question, setQuestion] = useState("What is 1+1?");
  const [timeLeft, setTimeLeft] = useState(59);

  return (
    <div className="App">
      <div id="question-timer-container">
        <Question question={question} />
        <Timer timeLeft={timeLeft} />
      </div>
    </div>
  );
}

export default App;
