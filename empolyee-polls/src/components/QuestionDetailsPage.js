import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import PageTitle from "./PageTitle";
import InfoMessage from "./InfoMessage";
import Question from "./Question";
import QuestionSummaryType from "./QuestionSummaryType";

const QuestionDetailsPage = ({ authedUser, users, questions }) => {

    const { qid } = useParams();


    const question = questions[qid];
    if (!question) {
        return (<InfoMessage text="404: No such question" />)
    }

    const answerable= !!authedUser && !users[authedUser].answers[qid];
    const summaryType = !!authedUser ? QuestionSummaryType.FULL : QuestionSummaryType.NONE;

    return (
        <div>
            <PageTitle text="Question details" />
            <InfoMessage text={ answerable ? "Answer this question" : "You answered this question"}></InfoMessage>
            <br />
            <Question question={question} summaryType={summaryType} />
        </div>
    )
};

export default connect(({ authedUser, users, questions }) => ({ authedUser, users, questions }))(QuestionDetailsPage);