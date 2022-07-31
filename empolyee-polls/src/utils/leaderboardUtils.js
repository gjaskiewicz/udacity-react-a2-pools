export const userAskedQuestions = (u) => (u.questions || []).length;
export const userAnsweredQuestions = (u) => Object.values(u.answers || {}).length;