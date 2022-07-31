import { render, fireEvent, getByPlaceholderText, getByText, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { handleLogin, setAuthUser } from "../actions/authedUser";

import { createNewStore } from "../app/store";
import NewQuestionPage from "./NewQuestionPage";

describe("New question page", () => {
    let storeInTest;
    let component;

    beforeEach(() => {
        storeInTest = createNewStore();
        storeInTest.dispatch(setAuthUser("tylermcginnis"));

        component = render(
            <Provider store={storeInTest}>
                <MemoryRouter>
                    <NewQuestionPage />
                </MemoryRouter>
            </Provider>
        );
    })

    it("submit blocked on incomplete data", () => {
        const submitButton = component.getByText("Create");
        const optionOneInput = component.getByPlaceholderText("Option 1");
        const optionTwoInput = component.getByPlaceholderText("Option 2");

        expect(submitButton).toBeDisabled();

        fireEvent.change(optionOneInput, { target: { value: "Write test now" } });
        expect(submitButton).toBeDisabled();

        fireEvent.change(optionTwoInput, { target: { value: "Debug later" } });
        expect(submitButton).toBeEnabled();
    });

    it("should create new question", async () => {
        const questionCount = () => {
            const { questions } = storeInTest.getState();
            return Object.keys(questions || { }).length;
        }

        const submitButton = component.getByText("Create");
        const optionOneInput = component.getByPlaceholderText("Option 1");
        const optionTwoInput = component.getByPlaceholderText("Option 2");

        fireEvent.change(optionOneInput, { target: { value: "Write test now" } });
        fireEvent.change(optionTwoInput, { target: { value: "Debug later" } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            if (questionCount() === 0) { throw "Too soon"; } return true;
        }, {
            timeout: 5000,
            interval: 200
        });

        const { questions } = storeInTest.getState();
        expect(Object.values(questions).length).toEqual(1);

        const newQuestion = Object.values(questions)[0];
        expect(newQuestion.optionOne.text).toEqual("Write test now");
        expect(newQuestion.optionTwo.text).toEqual("Debug later");
    })
});