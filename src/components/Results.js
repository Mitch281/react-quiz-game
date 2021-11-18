const Results = (props) => {
    return (
        <div id="results">
            <p>You scored: {props.score}</p>
            <table id="result-details">
            </table>
        </div>
    )
}

export default Results
