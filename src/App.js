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

  const [timeLeft, setTimeLeft] = useState(30);
  const [startGame, setStartGame] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  let dataLoaded = false;

  // Fetch questions and answers from api.
  // API used: https://opentdb.com/api_config.php
  useEffect(async () => {
    const url = "https://opentdb.com/api.php?amount=10&type=multiple";
    const response = await fetch(url);
    const data = await response.json();
    setQuestionData(data);

    // Set the initial data.
    setQuestion(data.results[questionNumber].question);
    setCorrectAnswer(data.results[questionNumber].correct_answer);
    setWrongAnswers(data.results[questionNumber].incorrect_answers);
  }, [])

  if (questionData !== "") {
    dataLoaded = true;
  }

  useEffect(() => {
    if (dataLoaded) {
      setData();
    }
  }, [questionNumber]);

  function setData() {
    // Set the data for the next question.
    setQuestion(questionData.results[questionNumber].question);
    setCorrectAnswer(questionData.results[questionNumber].correct_answer);
    setWrongAnswers(questionData.results[questionNumber].incorrect_answers);
  }

  // Increments the question number when an answer is clicked, and then goes to the next question.
  function getNextQuestion() {
    setQuestionNumber((questionNumber) => questionNumber + 1);
  }

  function decrementTimer() {
    setTimeLeft((timeLeft) => timeLeft - 1);
  }

  function startTimer() {
    setTimerStarted(true);
    setInterval(decrementTimer, 1000);
  }

  return (
    <div className="App">
      {!startGame ? <StartGame startGame={startGame} onStart={setStartGame} startTimer={startTimer} /> : ""}
      <div id="question-timer-container">
        {startGame && dataLoaded ? <Question question={question} /> : ""}
        {startGame && dataLoaded ? <Timer timeLeft={timeLeft} /> : ""}
      </div>
      {startGame && dataLoaded ? <Options correctAnswer={correctAnswer} wrongAnswers={wrongAnswers} 
      onAnswer={getNextQuestion} timerStarted={timerStarted} /> : ""}
    </div>
  );
}

export default App;
