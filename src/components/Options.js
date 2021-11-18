import ReactHtmlParser from 'react-html-parser';
import { useEffect, useState } from "react";

let orderOne, orderTwo, orderThree, orderFour;

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
                        orderOne = orders[orderIndex];
                        orders.splice(orderIndex, 1);
                        counter++;
                    }
                    break;
                case 1:
                    if (orders.includes(order)) {
                        orderTwo = orders[orderIndex];
                        orders.splice(orderIndex, 1);
                        counter++;
                    }
                    break;
                case 2:
                    if (orders.includes(order)) {
                        orderThree = orders[orderIndex];
                        orders.splice(orderIndex, 1);
                        counter++;
                    }
                    break;
                case 3:
                    if (orders.includes(order)) {
                        orderFour = orders[orderIndex];
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
                    <button style={{ order: orderOne }} type="button" className="option"
                        onClick={(e) => 
                        { props.onAnswer(); setOrderDetermined(false); props.checkAnswer(e)}}>
                        <span>{ReactHtmlParser(props.correctAnswer)}</span>
                    </button>
                    <button style={{ order: orderTwo }} type="button" className="option"
                        onClick={(e) => 
                        { props.onAnswer(); setOrderDetermined(false); props.checkAnswer(e)}}>
                        <span>{ReactHtmlParser(props.wrongAnswers[0])}</span>
                    </button>
                    <button style={{ order: orderThree }} type="button" className="option"
                        onClick={(e) => 
                        { props.onAnswer(); setOrderDetermined(false); props.checkAnswer(e)}}>
                        <span>{ReactHtmlParser(props.wrongAnswers[1])}</span>
                    </button>
                    <button style={{ order: orderFour }} type="button" className="option"
                        onClick={(e) => 
                        { props.onAnswer(); setOrderDetermined(false); props.checkAnswer(e)}}>
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
