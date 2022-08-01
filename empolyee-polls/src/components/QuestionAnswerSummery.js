import { connect } from "react-redux";

import QuestionOptions from "./QuestionOptions";
import QuestionSummaryType from "./QuestionSummaryType";
import UserAvatar from "./UserAvatar";

import "./css/QuestionAnswer.css";

const QuestionAnswerSummary = ({ authedUser, users, question, option, summaryType }) => {
    let allVotes = 0;
    Object.values(QuestionOptions).forEach(opt => {
        allVotes += (question[opt].votes || []).length;
    });
    const optionVotes = (question[option].votes || []);
    const votePercent = Math.round((allVotes > 0 ? (optionVotes.length / allVotes) : 0) * 10000) / 100;
    const text = question[option].text;
    const hasVoted = optionVotes.findIndex(u => u === authedUser) >= 0;

    const classes = ["questionAnswer"];
    if (authedUser) {
        classes.push(hasVoted ? "chosenOption" : "notChosenOption");
    }
    return (
        <div className={classes.join(" ")}>
            {
                summaryType > QuestionSummaryType.NONE &&
                (<div className="quationAnswer-votePrecent">
                    <span>Percent</span>
                    <span>{votePercent} %</span>
                </div>)
            }
            <span>{text}</span>
            <div className="questionAnswer-voters">
            {
                summaryType > QuestionSummaryType.SHORT && optionVotes.map(usrId => users[usrId] && <UserAvatar key={usrId} user={users[usrId]}/>)
            }   
            </div>
        </div>);
};

export default connect(({ authedUser, users }) => ({ authedUser, users }))(QuestionAnswerSummary);