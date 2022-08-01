import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageTitle from "./PageTitle";
import InfoMessage from "./InfoMessage";

import { handleCreateNewQuestion } from "../actions/questions";

import "./css/Question.css";
import "./css/QuestionAnswer.css"

const NewQuestionPage = ({ authedUser, dispatch }) => {

    const [optionOneText, setOptionOneText] = useState('');
    const [optionTwoText, setOptionTwoText] = useState('');

    // TODO: navigate on question add
    const navigate = useNavigate();

    const inputValid = () => {
        return !optionOneText || !optionTwoText || !authedUser;
    }

    const setInput = (mutator) => (e) => {
        e.preventDefault();
        mutator(e.target.value);
    };

    const createQuestion = (e) => {
        e.preventDefault();

        dispatch(handleCreateNewQuestion({
            optionOneText, 
            optionTwoText,
            author: authedUser
        }, (id) => navigate(`/questions/${id}`)));
    }

    if (!authedUser) {
        return (<InfoMessage text="Please sign in to create question" />);
    }

    return (
    <div>
        <PageTitle text="Create new question" />
        <div className="question">
            <div className="questionTitle">
                <span>Would you rather</span>
            </div>
            <div className="questionAnswers">
                <div className="questionAnswer">
                    <input placeholder="Option 1" onChange={setInput(setOptionOneText)} value={optionOneText}></input>
                </div>
                <div className="questionAnswer">
                    <input placeholder="Option 2" onChange={setInput(setOptionTwoText)} value={optionTwoText}></input>
                </div>
            </div>
            <div className="newQuestionButton">
                <button disabled={inputValid()} onClick={createQuestion}>Create</button>
            </div>
        </div>
    </div>);
};

export default connect(({ authedUser }) => ({ authedUser }))(NewQuestionPage);