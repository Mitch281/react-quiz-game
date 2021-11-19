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
            // eslint-disable-next-line
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

    // Here, we have reached the next question by letting the time run out. Thus, instead of changing state of 
    // orderDetermined through onCLick event, we have to change it with this useEffect hook. This ensures that
    // we do not render the options on the screen until the order has been determined in the case that the user
    // does not answer the question (case where user answers question is in the next useEffect hook).
    useEffect(() => {
        if (props.timeRunOut) {
            setOrderDetermined(false);
        }
        props.setTimeRunOut(false);
    // eslint-disable-next-line
    }, [props.timeRunOut]);

    useEffect(() => {
        determineOrder();
        setOrderDetermined(true);
    // eslint-disable-next-line
    }, [props.correctAnswer]);

    function outputHtml() {
        if (orderDetermined) {
            return (
                <div id="options">
                    <button style={{ order: orderOne }} type="button" className="option"
                        onClick={(e) => 
                        { setOrderDetermined(false); props.checkAnswer(e)}}>
                        <span>{ReactHtmlParser(props.correctAnswer)}</span>
                    </button>
                    <button style={{ order: orderTwo }} type="button" className="option"
                        onClick={(e) => 
                        { setOrderDetermined(false); props.checkAnswer(e)}}>
                        <span>{ReactHtmlParser(props.wrongAnswers[0])}</span>
                    </button>
                    <button style={{ order: orderThree }} type="button" className="option"
                        onClick={(e) => 
                        { setOrderDetermined(false); props.checkAnswer(e)}}>
                        <span>{ReactHtmlParser(props.wrongAnswers[1])}</span>
                    </button>
                    <button style={{ order: orderFour }} type="button" className="option"
                        onClick={(e) => 
                        { setOrderDetermined(false); props.checkAnswer(e)}}>
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
