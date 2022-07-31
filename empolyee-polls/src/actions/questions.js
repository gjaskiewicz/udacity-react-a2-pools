import { _saveQuestionAnswer, _saveQuestion, _getQuestions } from "../api/_Data";
import { updateUserAnswers, addUserQuestion, handleLoadUsers } from "./users";

export const CREATE_QUESTION = "CREATE_QUESTION";
export const UPDATE_QUESTIONS = "UPDATE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";

export function createQuestion (newQuestion) { 
    return {
        type: CREATE_QUESTION,
        newQuestion
    }
};

export function updateQuestions (questions) { 
    return {
        type: UPDATE_QUESTIONS,
        questions
    }
};

export function answerQuestion (userId, qid, answer) { 
    return {
        type: ANSWER_QUESTION,
        userId,
        qid,
        answer
    }
};

export function handleCreateNewQuestion(newQuestion, onQuestionCreated) {
    return (dispatch) => {
        _saveQuestion(newQuestion)
        .then(createdQuestion => {
            dispatch(createQuestion(createdQuestion));
            dispatch(addUserQuestion(createdQuestion.author, createdQuestion.id));
            onQuestionCreated(createdQuestion.id)
        })
        .catch((e) => {
            console.error(e);
            window.alert("There was a problem while creating a question.");
            dispatch(handleLoadQuestions());
            dispatch(handleLoadUsers());
        });
    };
  };

export function handleLoadQuestions() {
    return (dispatch) => {
        _getQuestions()
        .then(questions => {
            dispatch(updateQuestions(questions))
        })
        .catch((e) => {
            console.error(e);
            window.alert("There was a problem while getting questions.");
        });
    };
  };
  
  export function handleAnswerQuestion(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(answerQuestion(authedUser, qid, answer));
        dispatch(updateUserAnswers(authedUser, qid, answer));

        _saveQuestionAnswer({ authedUser, qid, answer })
        .catch((e) => {
            console.error(e);
            window.alert("There was a problem while getting questions.");
            dispatch(handleLoadQuestions());
            dispatch(handleLoadUsers());
        });
    };
  };