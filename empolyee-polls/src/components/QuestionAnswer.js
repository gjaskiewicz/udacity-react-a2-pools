import { connect } from "react-redux";

import { handleAnswerQuestion } from "../actions/questions";

import "./css/QuestionAnswer.css";

const QuestionAnswer = ({ authedUser, question, option, dispatch }) => {
    const answerClick = (e) => {
        e.preventDefault();
        if (authedUser) {
            dispatch(handleAnswerQuestion(authedUser, question.id, option));
        }
    }

    const text = question[option].text;
    return (
        <div onClick={answerClick} className="questionAnswer answerable">
            <span>{text}</span>
        </div>
    );
}

export default connect(({ authedUser }) => ({ authedUser }))(QuestionAnswer);