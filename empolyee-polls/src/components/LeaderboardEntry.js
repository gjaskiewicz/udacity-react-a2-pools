import { userAnsweredQuestions, userAskedQuestions } from "../utils/leaderboardUtils";

import UserAvatar from "./UserAvatar";

import "./css/LeaderboardEntry.css";

const LeaderboardEntry = ({ index, user }) => {
    const asked = userAskedQuestions(user);
    const answered = userAnsweredQuestions(user);

    return (
    <div className="leaderboardEntry">
        <div className="leaderboardUser">
            <span>{index + 1}.</span>
            <UserAvatar user={user} />
        </div>
        <div className="leaderboardStat">
            <span>Asked questions</span>
            <span>{asked}</span>
        </div>
        <div className="leaderboardStat">
            <span>Answered question</span>
            <span>{answered}</span>
        </div>
    </div>)
};

export default LeaderboardEntry;