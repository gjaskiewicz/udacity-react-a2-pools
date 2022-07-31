import { _getUsers } from "../api/_Data";

export const UPDATE_USERS = "UPDATE_USERS";
export const UPDATE_USER_ANSWERS = "UPDATE_USER_ANSWERS";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";

export function updateUsers (users) { 
    return {
        type: UPDATE_USERS,
        users
    }
};

export function updateUserAnswers (userId, qid, answer) { 
    return {
        type: UPDATE_USER_ANSWERS,
        userId, 
        qid, 
        answer
    }
};

export function addUserQuestion (userId, qid) {
    return {
        type: ADD_USER_QUESTION,
        userId, 
        qid
    }
}

export function handleLoadUsers() {
    return (dispatch) => {
        _getUsers()
        .then(users => {
            dispatch(updateUsers(users))
        })
        .catch((e) => {
            console.error(e);
            window.alert("There was a problem while getting users.");
        });
    };
  };