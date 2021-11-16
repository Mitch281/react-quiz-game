import ReactHtmlParser from 'react-html-parser';
import { useEffect, useState } from "react";

let correctOrder, wrongOneOrder, wrongTwoOrder, wrongThreeOrder;

const Options = (props) => {
    const [orderDetermined, setOrderDetermined] = useState(false);

    // Taken from mozilla docs.
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive.          
    }

    function determineOrder() {
        const orders = [1, 2, 3, 4]
        let counter = 0;
        while (counter < 4) {
            const orderIndex = getRandomInt(0, 4);
            const order = orders[orderIndex]
            switch (counter) {
                case 0:
                    if (orders.includes(order)) {
                        correctOrder = orders[orderIndex];
                        orders.splice(orderIndex, 1);
                        counter++;
                    }
                    break;
                case 1:
                    if (orders.includes(order)) {
                        wrongOneOrder = orders[orderIndex];
                        orders.splice(orderIndex, 1);
                        counter++;
                    }
                    break;
                case 2:
                    if (orders.includes(order)) {
                        wrongTwoOrder = orders[orderIndex];
                        orders.splice(orderIndex, 1);
                        counter++;
                    }
                    break;
                case 3:
                    if (orders.includes(order)) {
                        wrongThreeOrder = orders[orderIndex];
                        orders.splice(orderIndex, 1);
                        counter++;
                    }
                    break;
            }
        }
    }

    useEffect(() => {
        determineOrder();
        setOrderDetermined(true);
    }, [props.correctAnswer]);

    function outputHtml() {
        if (orderDetermined) {
            return (
                <div id="options">
                    <button style={{ order: correctOrder }} type="button" className="option" id="correct"
                        onClick={() => { props.onAnswer(); props.resetTimeLeft(); setOrderDetermined(false); }}>
                        <span>{ReactHtmlParser(props.correctAnswer)}</span>
                    </button>
                    <button style={{ order: wrongOneOrder }} type="button" className="option" id="wrong-1"
                        onClick={() => { props.onAnswer(); props.resetTimeLeft(); setOrderDetermined(false); }}>
                        <span>{ReactHtmlParser(props.wrongAnswers[0])}</span>
                    </button>
                    <button style={{ order: wrongTwoOrder }} type="button" className="option" id="wrong-2"
                        onClick={() => { props.onAnswer(); props.resetTimeLeft(); setOrderDetermined(false); }}>
                        <span>{ReactHtmlParser(props.wrongAnswers[1])}</span>
                    </button>
                    <button style={{ order: wrongThreeOrder }} type="button" className="option" id="wrong-3"
                        onClick={() => { props.onAnswer(); props.resetTimeLeft(); setOrderDetermined(false); }}>
                        <span>{ReactHtmlParser(props.wrongAnswers[2])}</span>
                    </button>
                </div>
            );
        }
        return "";
    }

    return (
        outputHtml()
    );
}

export default Options
