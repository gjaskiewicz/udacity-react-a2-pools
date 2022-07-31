import { connect } from "react-redux";

import PageTitle from "./PageTitle";
import InfoMessage from "./InfoMessage";
import LeaderboardEntry from "./LeaderboardEntry";

import { userAnsweredQuestions, userAskedQuestions } from "../utils/leaderboardUtils";

const LeaderboardPage = ({ authedUser, usersByScore }) => {
    if (!authedUser) {
        return (<InfoMessage text="You need to log in to see leaderboard" />);
    }
    return (
    <div>
        <PageTitle text="Leaderboard" />
        <ul>
        {
            usersByScore.map((user, i) => <li key={user.id}><LeaderboardEntry user={user} index={i} /></li>)
        }
        </ul>
    </div>);
};

const mapStateToProps = ({ authedUser, users }) => {
    const userScoringFunc = (u) => {
        return userAskedQuestions(u) + userAnsweredQuestions(u); 
    };

    let usersByScore = Object.values(users || {}).sort((u1, u2) => userScoringFunc(u2) - userScoringFunc(u1));
    return { authedUser, usersByScore };
}

export default connect(mapStateToProps)(LeaderboardPage);
