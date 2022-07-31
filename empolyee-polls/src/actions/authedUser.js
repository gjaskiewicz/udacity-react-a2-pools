import { _getUsers } from "../api/_Data";

export const SET_AUTH_USER = "SET_AUTH_USER";

export function setAuthUser (userId) { 
    return {
        type: SET_AUTH_USER,
        userId
    }
};

export function handleLogin(user, pass, onLoginCallback, onFailedLoginCallback) {
    return (dispatch) => {
        _getUsers()
        .then(users => {
            if (users && users[user] && users[user].password === pass) {
                dispatch(setAuthUser(user));
                if (onLoginCallback) { onLoginCallback(); }
            } else {
                if (onFailedLoginCallback) { onFailedLoginCallback(); }
            }
        })
        .catch((e) => {
          window.alert("There was an error while logging in.");
        });
    };
  };