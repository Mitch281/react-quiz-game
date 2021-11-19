import { useState, useEffect } from "react";

const StartGame = (props) => {
    console.log("rendered");
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

        if (numberQuestions === "") {
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

        props.setSettings(numberQuestions, category, difficulty);
        props.startTimer();

        setNumberQuestions("");
        setCategory("");
        setNumberQuestions("");
    }

    function createOptionTags() {
        return props.categories.map(createCategory);
    }

    useEffect(() => {
        setCategoryOptions(createOptionTags());
    // eslint-disable-next-line
    }, []);

    return (
        <form onSubmit={beginTheQuiz}>
            <div id="form-inputs">
                <label htmlFor="number-of-questions">Number of Questions</label>
                <input type="text" id="number-of-questions" onChange={(e) => setNumberQuestions(e.target.value)}
                value={numberQuestions}></input>

                <label htmlFor="category">Select Category:</label>
                <select id="category" onChange={(e) => setCategory(e.target.value)}>
                    {categoryOptions}
                </select>

                <label htmlFor="difficulty">Select difficulty: </label>
                <select id="difficulty" onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            <div id="submission">
                <input type="submit" value="Start" />
            </div>
        </form>
    );
}

export default StartGame
