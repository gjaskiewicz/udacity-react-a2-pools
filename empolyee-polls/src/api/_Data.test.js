const _Data = require('./_Data');

describe("API tests", () => {

    describe("save question", () => {
        const author = "test";
        const optionOneText = "Test 1";
        const optionTwoText = "Test 2";

        it("saved question is returned and all expected fields are populated", async () => {
            const result = await _Data._saveQuestion({
                author, optionOneText, optionTwoText
            });
            expect(result.id).not.toBeUndefined();
            expect(result.timestamp).not.toBeUndefined();
            expect(result.author).toEqual(author);
            expect(result.optionOne.text).toEqual(optionOneText);
            expect(result.optionTwo.text).toEqual(optionTwoText);
        });
    
        describe("error is returned if incorrect data is passed", () => {
            const errorText = "Please provide optionOneText, optionTwoText, and author";
    
            it("empty data", async () => {
                await expect(_Data._saveQuestion({ })).rejects.toEqual(errorText);
            });
    
            it("missing option text", async () => {
                await expect(_Data._saveQuestion({ author })).rejects.toEqual(errorText);
            });
    
            it("missing author", async () => {
                await expect(_Data._saveQuestion({ optionOneText, optionTwoText })).rejects.toEqual(errorText);
            });
        });
    });

    describe("save question answer", () => { 
        const authedUser = "sarahedo";
        const qid = "vthrdm985a262al8qx3do";
        const answer = "optionOne";

        it("saved question answer is returned", async () => {
            const result = await _Data._saveQuestionAnswer({
                authedUser, qid, answer
            });
            const users = await _Data._getUsers();
            const questions = await _Data._getQuestions();
    
            expect(result).toEqual(true);
            expect(users[authedUser].answers[qid]).toEqual(answer);
            expect(questions[qid][answer].votes).toContain(authedUser);
        });
    
        describe("error is returned if incorrect data is passed", () => {
            const errorText = "Please provide authedUser, qid, and answer";
    
            it("empty data", async () => {
                await expect(_Data._saveQuestionAnswer({ })).rejects.toEqual(errorText);
            });

            it("no author", async () => {
                await expect(_Data._saveQuestionAnswer({ qid, answer })).rejects.toEqual(errorText);
            });

            it("no qid", async () => {
                await expect(_Data._saveQuestionAnswer({ authedUser, answer })).rejects.toEqual(errorText);
            });

            it("no answer", async () => {
                await expect(_Data._saveQuestionAnswer({ authedUser, qid })).rejects.toEqual(errorText);
            });
        });
    });
});