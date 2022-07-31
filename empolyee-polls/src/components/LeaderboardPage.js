import { connect } from "react-redux";

import PageTitle from "./PageTitle";
import LeaderboardEntry from "./LeaderboardEntry";

import { userAnsweredQuestions, userAskedQuestions } from "../utils/leaderboardUtils";

const LeaderboardPage = ({ usersByScore }) => {
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

const mapStateToProps = ({ users }) => {
    const userScoringFunc = (u) => {
        return userAskedQuestions(u) + userAnsweredQuestions(u); 
    };

    let usersByScore = Object.values(users || {}).sort((u1, u2) => userScoringFunc(u2) - userScoringFunc(u1));
    return { usersByScore };
}

export default connect(mapStateToProps)(LeaderboardPage);
