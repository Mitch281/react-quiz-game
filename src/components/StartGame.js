const StartGame = (props) => {
    
    function createCategory(category) {
        const id = category.id;
        const categoryName = category.name;

        const key = Math.floor(Math.random() * 10000);
        return <option key={key} value={id}>{categoryName}</option>;
    }

    return (
        <div id="start-game-container">
            <form>
                <label htmlFor="number-of-questions">Number of Questions</label>
                <input type="text" id="number-of-questions"></input>

                <label htmlFor="category">Select Category:</label>
                <select id="category">
                    {props.categories.map(createCategory)}
                </select>
            </form>
        </div>
        // <div id="start-game-container">
        //     <button type="button" onClick={() => { props.onStart(true); props.startTimer(); }}>
        //         <span>
        //             Start Game
        //         </span>
        //     </button>
        // </div>
    )
}

export default StartGame
