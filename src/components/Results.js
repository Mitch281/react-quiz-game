import ReactHtmlParser from 'react-html-parser';

const Results = (props) => {

    function refreshPage() {
        window.location.reload();
        return false;
    }

    function createTableRow(playersAnswer) {
        const key = Math.floor(Math.random() * 10000);
        return (
            <tr key={key}>
                <td>{playersAnswer.id + 1}</td>
                <td>{ReactHtmlParser (playersAnswer.question)}</td>
                <td>{ReactHtmlParser (playersAnswer.answer)}</td>
                <td>{ReactHtmlParser (playersAnswer.correctAnswer)}</td>
                {playersAnswer.answer === playersAnswer.correctAnswer ? <td>correct</td> : <td>wrong</td>}
            </tr>
        );
    }

    return (
        <div>
            <p>You scored: {props.score}</p>
            <table id="results-details">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Question</th>
                        <th>Your Answer</th>
                        <th>Correct Answer</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {props.playersAnswers.map(createTableRow)}
                </tbody>
            </table>
            <button onClick={() => refreshPage()}>Play Again</button>
        </div>
    )
}

export default Results