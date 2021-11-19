const QuestionNumberTracker = (props) => {
    return (
        <div>
            <span>{props.questionNumber + 1} / {props.enteredNumberQuestions}</span>
        </div>
    )
}

export default QuestionNumberTracker
