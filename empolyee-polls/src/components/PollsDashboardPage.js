import { connect } from "react-redux";
import { useState } from "react";

import PageTitle from "./PageTitle";
import Question from "./Question";
import QuestionSummaryType from "./QuestionSummaryType";

import "./PollsDashboardPage.css"

const Mode = {
    ANSWERED: "ANSWERED",
    UNANSWERED: "UNANSWERED"
}

const PollsDashboardPage = ({ authedUser, questions, users }) => {

    const [mode, setMode] = useState(Mode.UNANSWERED);

    const selectMode = (mode) => (e) => {
        e.preventDefault();
        setMode(mode);
    }

    let displayQuestions = questions && Object.values(questions);
    if (users && authedUser) {
        const { answers } = users[authedUser];
        displayQuestions = displayQuestions.filter(q => {
            if (mode == Mode.ANSWERED) { return !!answers[q.id]; }
            if (mode == Mode.UNANSWERED) { return !answers[q.id]; }
            return false;
        });
    }

    const summaryType = !!authedUser ? QuestionSummaryType.SHORT : QuestionSummaryType.NONE;

    return (
        <div>
            <PageTitle text="Polls" />
            <ul className="pollsTabs" style={{display: (!authedUser ? "none" : "flex")}}>
                <li className={mode === Mode.ANSWERED ? "selected" : ""}>
                    <a href="#" onClick={selectMode(Mode.ANSWERED)}>ANSWERED</a>
                </li>
                <li className={mode === Mode.UNANSWERED ? "selected" : ""}>
                    <a href="#" onClick={selectMode(Mode.UNANSWERED)} >UNANSWERED</a>
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
            { (displayQuestions || []).length == 0 && (<div>No questions here</div>) }
        </div>)
};

export default connect(({ authedUser, questions, users }) => ({ authedUser, questions, users }))(PollsDashboardPage);