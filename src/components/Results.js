import ReactHtmlParser from 'react-html-parser';
import { useState, useEffect } from 'react/cjs/react.development';

const Results = (props) => {
    const [results, setResults] = useState("");

    function createTableRow(playersAnswer) {
        const key = Math.floor(Math.random() * 10000);
        return (
            <tr key={key}>
                <td>{playersAnswer.id + 1}</td>
                <td>{ReactHtmlParser (playersAnswer.question)}</td>
                <td>{ReactHtmlParser (playersAnswer.answer)}</td>
                <td>{ReactHtmlParser (playersAnswer.correctAnswer)}</td>
            </tr>
        );
    }

    useEffect(() => {
        setResults(props.playersAnswers.map(createTableRow));
    }, [])

    return (
        <div>
            <p>You scored: {props.score}</p>
            <table id="results-details">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Question</th>
                        <th>Correct Answer</th>
                        <th>Your Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {results}
                </tbody>
            </table>
        </div>
    )
}

export default Results