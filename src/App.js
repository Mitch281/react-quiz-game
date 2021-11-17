import { useState, useEffect } from "react";
import Question from "./components/Question";
import Timer from "./components/Timer";
import StartGame from "./components/StartGame";
import Options from "./components/Options";
import Results from "./components/Results";

const TIME_LIMIT = 30;
let dataLoaded = false;
let score = 0;

function App() {
  const [questionData, setQuestionData] = useState("");
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [questionNumber, setQuestionNumber] = useState(0);

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [startGame, setStartGame] = useState(false);
  const [finishedGame, setFinishedGame] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  // Fetch questions and answers from api.
  // API used: https://opentdb.com/api_config.php
  useEffect(() => {
    async function fetchData() {
      const url = "https://opentdb.com/api.php?amount=10&type=multiple";
      const response = await fetch(url);
      const data = await response.json();
      setQuestionData(data);

      // Set the initial data.
      setQuestion(data.results[questionNumber].question);
      setCorrectAnswer(data.results[questionNumber].correct_answer);
      setWrongAnswers(data.results[questionNumber].incorrect_answers);
    }

    fetchData();
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
    try {
      // Set the data for the next question.
      setQuestion(questionData.results[questionNumber].question);
      setCorrectAnswer(questionData.results[questionNumber].correct_answer);
      setWrongAnswers(questionData.results[questionNumber].incorrect_answers);
    } 
    // The user has answered all of the questions. Thus, we do not want to get the next question.
    catch (error) {
      setStartGame(false);
      setFinishedGame(true);
    }
  }

  // Increments the question number when an answer is clicked, and then goes to the next question.
  function getNextQuestion() {
    setQuestionNumber((questionNumber) => questionNumber + 1);
  }

  function resetTimer() {
    setTimeLeft(TIME_LIMIT);
  }

  function decrementTimer() {
    setTimeLeft((timeLeft) => timeLeft - 1);
  }

  function startTimer() {
    setTimerStarted(true);
    setInterval(decrementTimer, 1000);
  }

  function checkAnswer(e) {
    let optionSelected;
    if (e.target instanceof HTMLButtonElement) {
      optionSelected = e.target.outerText;
    }
    else if (e.target instanceof HTMLSpanElement) {
      optionSelected = e.target.innerText;
    }
    if (optionSelected === correctAnswer) {
      score++;
    }
  }

  if (timeLeft === 0) {
    resetTimer();
    getNextQuestion();;
  }

  return (
    <div className="App">
      {!startGame && !finishedGame ? <StartGame startGame={startGame} onStart={setStartGame} startTimer={startTimer} /> : ""}
      {finishedGame ? <Results score={score} /> : ""}
      <div id="question-timer-container">
        {startGame && dataLoaded && !finishedGame ? <Question question={question} /> : ""}
        {startGame && dataLoaded && !finishedGame ? <Timer timeLeft={timeLeft} /> : ""}
      </div>
      {startGame && dataLoaded && !finishedGame ? <Options correctAnswer={correctAnswer} wrongAnswers={wrongAnswers}
        onAnswer={getNextQuestion} timerStarted={timerStarted} resetTimeLeft={resetTimer} checkAnswer={checkAnswer} /> : ""}
    </div>
  );
}

export default App;
