import { connect } from "react-redux";
import { setAuthUser } from "../actions/authedUser";

import UserAvatar from "./UserAvatar";

import "../css/common.css";
import "./css/SignedUser.css";

const SignedUser = ({ user, dispatch }) => {

    const signOut = (e) => {
        e.preventDefault();
        dispatch(setAuthUser(null));
    };

    return (
        <div className="signedUser">
            {user && (
            <div className="signedUser">
                <span>Signed as </span> 
                &nbsp;
                <UserAvatar user={user} />
                &nbsp;
                <button className="buttonAsLink" onClick={signOut}>Sign out</button>
            </div>)}
            {!user && <span>Not signed in</span>}
        </div>
    );
}

export default connect(({ authedUser, users }) => ({ 
    user: authedUser && users[authedUser] }))(SignedUser);