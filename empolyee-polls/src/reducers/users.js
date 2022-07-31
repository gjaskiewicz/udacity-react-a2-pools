import { UPDATE_USERS, UPDATE_USER_ANSWERS, ADD_USER_QUESTION } from "../actions/users";

export default function questions (state = { }, action) {
    switch (action.type) {
        case UPDATE_USERS:
            return action.users;
        case UPDATE_USER_ANSWERS:
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    answers: {
                        ...state[action.userId].answers,
                        [action.qid]: action.answer
                    }
                }
            }
        case ADD_USER_QUESTION:
            return {
                ...state,
                [action.userId]: {
                    ...state[action.userId],
                    questions: [...((state[action.userId] || { }).questions || []), action.qid]
                }
            }
        default:
            return state;
    }
}