import { useState } from "react";
import { handleLogin } from "../actions/authedUser";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import PageTitle from "./PageTitle";

import "./LoginPage.css";

const LoginPage = ({ dispatch }) => {

    const [error, setError] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userNameChanged = (e) => {
        e.preventDefault();
        setUserName(e.target.value);
    }

    const passwordChanged = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const signIn = (e) => {
        dispatch(handleLogin(userName, password, 
            () => {
                navigate("/");
            }, 
            () => {
                setError("Invalid user or password"); 
            }));

        setUserName('');
        setPassword('');
    };

    return (
        <div className="login">
            <PageTitle text="Log in" />
            {
                error && (<div className="error" data-testid="login-error">{error}</div>)
            }
            <div>
                <span>Login</span>
                <input onChange={userNameChanged} value={userName} data-testid="login-input" />
            </div>
            <div>
                <span>Password</span>
                <input type="password" onChange={passwordChanged} value={password} data-testid="password-input"/>
            </div>
            <div>
                <button onClick={signIn}>Sign In</button>
            </div>
        </div>);
};

export default connect((props) => ({ }))(LoginPage);