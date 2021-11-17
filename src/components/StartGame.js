import { useState } from "react";
import { useEffect } from "react/cjs/react.development";

//TODO: Add check to ensure that numberQuestions is between 0 and 50 (not working?).

const StartGame = (props) => {
    const [categoryOptions, setCategoryOptions] = useState("");

    // Number of questions can only be between 1 and 50.
    const [numberQuestions, setNumberQuestions] = useState("");

    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    
    function createCategory(category) {
        const id = category.id;
        const categoryName = category.name;

        const key = Math.floor(Math.random() * 10000);
        return <option key={key} value={id}>{categoryName}</option>;
    }

    function beginTheQuiz(e) {
        e.preventDefault(); // Stops page reload (default behaviour of form submission.)
        setNumberQuestions((numberQuestions) => numberQuestions.trim());

        if (numberQuestions == "") {
            alert("Please enter a number between 1 and 50 for the number of questions.");
            return;
        }
        else if (isNaN(numberQuestions)) {
            alert("Please enter a number between 1 and 50 for the number of questions.");
            return;
        }
        else if (numberQuestions < 1 || numberQuestions > 50) {
            alert("Please enter a number between 1 and 50 for the number of questions.");
            return;
        }

        setNumberQuestions("");
        setCategory("");
        setNumberQuestions("");
    }

    function createOptionTags() {
        return props.categories.map(createCategory);
    }

    useEffect(() => {
        setCategoryOptions(createOptionTags());
    }, []);

    return (
        <div id="start-game-container">
            <form onSubmit={beginTheQuiz}>
                <label htmlFor="number-of-questions">Number of Questions</label>
                <input type="text" id="number-of-questions" onChange={(e) => setNumberQuestions(e.target.value)}
                value={numberQuestions}></input>

                <label htmlFor="category">Select Category:</label>
                <select id="category" onChange={(e) => setCategory(e.target.value)}>
                    <option>Select Category</option>
                    {categoryOptions}
                </select>

                <label htmlFor="difficulty">Select difficulty: </label>
                <select id="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                <input type="submit" value="Start" />
            </form>
        </div>
    )
}

export default StartGame
