import { useState, useEffect } from "react";
import Question from "./components/Question";
import Timer from "./components/Timer";
import StartGame from "./components/StartGame";
import Options from "./components/Options";

function App() {
  const [questionData, setQuestionData] = useState("");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [questionNumber, setQuestionNumber] = useState(0);

  const [timeLeft, setTimeLeft] = useState(59);
  const [startGame, setStartGame] = useState(false);

  let dataLoaded = false;

  // Fetch questions and answers from api.
  // API used: https://opentdb.com/api_config.php
  useEffect(async () => {
    const url = "https://opentdb.com/api.php?amount=10&type=multiple";
    const response = await fetch(url);
    const data = await response.json();
    setQuestionData(data);

    // Set the initial questions and options on app run.
    setQuestion(data.results[questionNumber].question);
    setCorrectAnswer(data.results[questionNumber].correct_answer);
    setWrongAnswers(data.results[questionNumber].incorrect_answers);
  }, [questionNumber])

  if (questionData !== "") {
    dataLoaded = true;
  }

  // Increments the question number when an answer is clicked, and then goes to the next question.
  function getNextQuestion() {
    setQuestionNumber((questionNumber) => questionNumber + 1);
  }

  return (
    <div className="App">
      {!startGame ? <StartGame startGame={startGame} onStart={setStartGame} /> : ""}
      <div id="question-timer-container">
        {startGame && dataLoaded ? <Question question={question} /> : ""}
        {startGame && dataLoaded ? <Timer timeLeft={timeLeft} /> : ""}
      </div>
      {startGame && dataLoaded ? <Options correctAnswer={correctAnswer} wrongAnswers={wrongAnswers} 
      onAnswer={getNextQuestion} /> : ""}
    </div>
  );
}

export default App;
