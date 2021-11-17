const StartGame = (props) => {
    return (
        <div id="start-game-container">
            <button type="button" onClick={() => { props.onStart(true); props.startTimer(); }}>
                <span>
                    Start Game
                </span>
            </button>
        </div>
    )
}

export default StartGame
