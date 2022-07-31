import { connect } from "react-redux";
import { Link } from "react-router-dom";

import QuestionAnswer from "./QuestionAnswer";
import QuestionAnswerSummery from "./QuestionAnswerSummery";
import QuestionOptions from "./QuestionOptions";
import UserAvatar from "./UserAvatar";

import "./Question.css";

const Question = ({ authedUser, users, question, summaryType }) => {
    const qid = question.id;
    const answerable= !!authedUser && !users[authedUser].answers[qid];
    const authorUser = (users || {})[question.author];
    return (
    <div className="question">
        <div className="questionTitle">
            <span><Link to={`/questions/${question.id}`}>Would you rather</Link></span>
        </div>
        <div className="questionAnswers">
            {answerable && <QuestionAnswer question={question} option={QuestionOptions.OPTION_ONE} /> }
            {answerable && <QuestionAnswer question={question} option={QuestionOptions.OPTION_TWO} /> }
            {!answerable && <QuestionAnswerSummery question={question} option={QuestionOptions.OPTION_ONE} summaryType={summaryType} />}
            {!answerable && <QuestionAnswerSummery question={question} option={QuestionOptions.OPTION_TWO} summaryType={summaryType}/>}
        </div>
        <div className="questionAuthor">
            <span>By</span> <UserAvatar user={authorUser}/>
        </div>
    </div>);
}

export default connect(({ authedUser, users }) => ({ authedUser, users }))(Question);