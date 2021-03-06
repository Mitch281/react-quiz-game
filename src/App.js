import { useState, useEffect, useRef } from "react";
import Question from "./components/Question";
import Timer from "./components/Timer";
import StartGame from "./components/StartGame";
import Options from "./components/Options";
import Results from "./components/Results";
import QuestionNumberTracker from "./components/QuestionNumberTracker";
import Error from "./components/Error";
import LoadingScreen from "./components/LoadingScreen";

const TIME_LIMIT = 10;

function App() {

  // Question data is all of the data read from the api (from dataUrl). Question is simply the question.
  const [questionData, setQuestionData] = useState("");
  const [question, setQuestion] = useState("");
  const [playersAnswers, setPlayersAnswers] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [questionNumber, setQuestionNumber] = useState(0);

  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [timeRunOut, setTimeRunOut] = useState(false);

  const [startGame, setStartGame] = useState(false);
  const [finishedGame, setFinishedGame] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [errorFound, setErrorFound] = useState(false);

  const [categories, setCategories] = useState("");
  const [dataUrl, setDataUrl] = useState("");

  const score = useRef(0);
  const enteredNumberQuestions = useRef(0);
  const timerInterval = useRef();

  // Fetch categories and their id's from api. This helps us creating select menu for categories, in that we won't
  // need to manually write a bunch of html option tags.
  useEffect(() => {
    async function fetchCategories() {
      try {
        const url = "https://opentdb.com/api_category.php";
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setCategories(data.trivia_categories);
        }
      } catch (error) {
        setErrorFound(true);
      }
    }

    fetchCategories();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(dataUrl);
        if (response.ok) {
          const data = await response.json();
          setQuestionData(data);

          // Set the initial data.
          setQuestion(data.results[questionNumber].question);
          setCorrectAnswer(data.results[questionNumber].correct_answer);
          setWrongAnswers(data.results[questionNumber].incorrect_answers);
        }
      } catch (error) {
        setErrorFound(true);
      }
    }

    // We need to check this because the useEffect hook runs on component load, when data url is empty.
    if (!(dataUrl === "")) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [dataUrl]);

  useEffect(() => {
    if (questionData !== "") {
      setDataLoaded(true);
    }
  }, [questionData]);

  useEffect(() => {
    if (categories !== "") {
      setCategoriesLoaded(true);
    }
  }, [categories]);

  useEffect(() => {
    if (dataLoaded) {
      setData();
    }
    // eslint-disable-next-line
  }, [questionNumber]);

  useEffect(() => {
    if (finishedGame) {
      clearInterval(timerInterval.current);
    }
  }, [finishedGame]);

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

  useEffect(() => {
    if (dataLoaded) {
      startTimer();
    }
    // eslint-disable-next-line
  }, [dataLoaded]);

  function startTimer() {
    timerInterval.current = setInterval(decrementTimer, 1000);
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
      score.current += 1;
    }

    // Keep track of the player's answers so we can give a summary at the end of the quiz.
    const answerSelected = {id: questionNumber, question: question, answer: optionSelected, correctAnswer: correctAnswer};
    setPlayersAnswers([...playersAnswers, answerSelected]);

    resetTimer();
    getNextQuestion();
  }

  function setSettings(numberQuestions, category, difficulty) {
    enteredNumberQuestions.current = parseInt(numberQuestions);
    setStartGame(true);
    setDataUrl(`https://opentdb.com/api.php?amount=${numberQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`);
  }

  if (timeLeft === 0) {
    const answerSelected = {id: questionNumber, question: question, answer: "", correctAnswer: correctAnswer};
    setPlayersAnswers([...playersAnswers, answerSelected]);
    
    setTimeRunOut(true);
    resetTimer();
    getNextQuestion();
  }

  return (
    <div className="App">
      {errorFound ? <Error /> : ""}

      {!startGame && categoriesLoaded && !finishedGame ? <StartGame startGame={startGame} onStart={setStartGame} 
      startTimer={startTimer} categories={categories} setSettings={setSettings} /> : ""}

      {startGame && !dataLoaded ? <LoadingScreen /> : ""}

      {!errorFound && finishedGame ? <Results score={score.current} playersAnswers={playersAnswers} 
      numberQuestions={enteredNumberQuestions.current} /> : ""}

      {!errorFound && startGame && dataLoaded && !finishedGame ? <QuestionNumberTracker questionNumber={questionNumber} 
      enteredNumberQuestions={enteredNumberQuestions.current} /> : ""}

      {!errorFound && startGame && dataLoaded && !finishedGame ? 
      <div id="question-timer-container">
        <Question question={question} />
        <Timer timeLeft={timeLeft} />
      </div> : ""}

      {!errorFound && startGame && dataLoaded && !finishedGame ? <Options correctAnswer={correctAnswer} wrongAnswers={wrongAnswers}
        resetTimeLeft={resetTimer} checkAnswer={checkAnswer} timeRunOut={timeRunOut} setTimeRunOut={setTimeRunOut} /> 
        : ""}
    </div>
  );
}

export default App;
