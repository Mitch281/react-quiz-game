const QuestionNumberTracker = (props) => {
    return (
        <div>
            <span>{props.questionNumber} / {props.enteredNumberQuestions}</span>
        </div>
    )
}

export default QuestionNumberTracker
