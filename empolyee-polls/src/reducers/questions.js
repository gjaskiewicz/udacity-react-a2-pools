import { 
    CREATE_QUESTION, 
    UPDATE_QUESTIONS, 
    ANSWER_QUESTION 
} from "../actions/questions";

export default function questions (state = { }, action) {
    switch (action.type) {
        case CREATE_QUESTION:
            return {
                ...state,
                [action.newQuestion.id]: action.newQuestion
            };
        case ANSWER_QUESTION:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: [...state[action.qid][action.answer].votes, action.userId]
                    }
                }
            };
        case UPDATE_QUESTIONS:
            return action.questions;
        default:
            return state;
    }
}