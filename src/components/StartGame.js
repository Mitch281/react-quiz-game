const StartGame = (props) => {
    return (
        <>
            <button type="button" onClick={() => props.onStart(true)}>Start Game</button>
        </>
    )
}

export default StartGame
