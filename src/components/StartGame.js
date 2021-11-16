const StartGame = (props) => {
    return (
        <>
            <button type="button" onClick={() => {props.onStart(true);props.startTimer();}}>Start Game</button>
        </>
    )
}

export default StartGame
