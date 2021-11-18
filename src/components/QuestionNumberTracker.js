const QuestionNumberTracker = (props) => {
    return (
        <div>
            <span>{props.questionNumber} / {props.enteredNumberQuestions}</span>
            <span>{props.enteredCategory}</span>
            <span>{props.enteredDifficulty}</span>
        </div>
    )
}

export default QuestionNumberTracker
