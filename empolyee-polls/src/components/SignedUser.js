import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthUser } from "../actions/authedUser";

import UserAvatar from "./UserAvatar";

import "./SignedUser.css";

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
                <a href="#" onClick={signOut}>Sign out</a>
            </div>)}
            {!user && <Link to="/signin">Sign in</Link>}
        </div>
    );
}

export default connect(({ authedUser, users }) => ({ 
    user: authedUser && users[authedUser] }))(SignedUser);