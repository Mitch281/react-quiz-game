import ReactHtmlParser from 'react-html-parser';

const Question = (props) => {
    return (
        <h1 id="question">{ReactHtmlParser (props.question)}</h1>   
    )
}

export default Question
