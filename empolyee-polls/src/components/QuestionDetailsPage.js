import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import PageTitle from "./PageTitle";
import InfoMessage from "./InfoMessage";
import Question from "./Question";
import QuestionSummaryType from "./QuestionSummaryType";

const QuestionDetailsPage = ({ authedUser, users, questions }) => {

    const { question_id } = useParams();

    if (!authedUser) {
        return (<InfoMessage text="Please log in to view the poll" />);
    }

    const question = questions[question_id];
    if (!question) {
        return (<InfoMessage text="404: No such question" />)
    }

    const answerable= !!authedUser && !users[authedUser].answers[question_id];
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