import { connect } from "react-redux";
import { useState } from "react";

import PageTitle from "./PageTitle";
import InfoMessage from "./InfoMessage";
import Question from "./Question";
import QuestionSummaryType from "./QuestionSummaryType";

import "../css/common.css";
import "./css/PollsDashboardPage.css"

const Mode = {
    ANSWERED: "ANSWERED",
    UNANSWERED: "UNANSWERED"
}

const PollsDashboardPage = ({ authedUser, questionsByTime, users }) => {

    const [mode, setMode] = useState(Mode.UNANSWERED);

    const selectMode = (mode) => (e) => {
        e.preventDefault();
        setMode(mode);
    }

    let displayQuestions = questionsByTime || [];
    if (users && authedUser) {
        const { answers } = users[authedUser];
        displayQuestions = displayQuestions.filter(q => {
            if (mode === Mode.ANSWERED) { return !!answers[q.id]; }
            if (mode === Mode.UNANSWERED) { return !answers[q.id]; }
            return false;
        });
    }

    const summaryType = !!authedUser ? QuestionSummaryType.SHORT : QuestionSummaryType.NONE;

    return (
        <div>
            <PageTitle text="Polls" />
            { !authedUser && <InfoMessage text="Sign in to vote" />}
            <ul className="pollsTabs" style={{display: (!authedUser ? "none" : "flex")}}>
                <li className={mode === Mode.ANSWERED ? "selected" : ""}>
                    <button className="buttonAsLink" onClick={selectMode(Mode.ANSWERED)}>ANSWERED</button>
                </li>
                <li className={mode === Mode.UNANSWERED ? "selected" : ""}>
                    <button className="buttonAsLink" onClick={selectMode(Mode.UNANSWERED)} >UNANSWERED</button>
                </li>
            </ul>
            <ul>
                {
                    displayQuestions && displayQuestions.map(q => (<Question 
                        key={q.id} 
                        question={q}
                        summaryType={summaryType} />))
                }
            </ul>
            { (displayQuestions || []).length === 0 && (<div>No questions here</div>) }
        </div>)
};

const mapStateToProps = ({ authedUser, questions, users }) => {
    let questionsByTime = Object.values(questions || {}).sort((q1, q2) => q2.timestamp - q1.timestamp);
    return { authedUser, questionsByTime, users };
};

export default connect(mapStateToProps)(PollsDashboardPage);