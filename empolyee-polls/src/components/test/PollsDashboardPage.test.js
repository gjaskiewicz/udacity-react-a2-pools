import { createNewStore } from "../../app/store";
import { render, getByText, queryByText, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import PollsDashboardPage from "../PollsDashboardPage";

describe("Polls Dashboard page", () => {
    let storeInTest;
    let component;

    beforeEach(() => {
        const preloadedState = {
            users: {
                usr1: {
                    id: "usr1",
                    name: "USER 1",
                    answers: {
                      "q2": "optionOne"
                    },
                    questions: ["q1a", "q2"]
                },
            },
            questions: {
                q1a: {
                    id: "q1a",
                    author: "usr1",
                    timestamp: 1467166872634,
                    optionOne: { votes: [], text: "Q1-1A" },
                    optionTwo: { votes: [], text: "Q1-2A" }
                },
                q1b: {
                    id: "q1b",
                    author: "usr1",
                    timestamp: 1467166972634,
                    optionOne: { votes: [], text: "Q1-1B" },
                    optionTwo: { votes: [], text: "Q1-2B" }
                },
                q2: {
                    id: "q2",
                    author: "usr1",
                    timestamp: 1467166872634,
                    optionOne: { votes: [ "usr1" ], text: "Q2-1" },
                    optionTwo: { votes: [], text: "Q2-2" }
                }
            },
            authedUser: "usr1"
        };
        storeInTest = createNewStore(preloadedState);

        component = render(
            <Provider store={storeInTest}>
                <MemoryRouter>
                    <PollsDashboardPage />
                </MemoryRouter>
            </Provider>
        );
    });

    it("displays questions in correct order", () => { 
        const elements = component.queryAllByText(/Q1-1[A-Z]/);

        expect(elements.length).toEqual(2);
        expect(elements[0].textContent).toEqual("Q1-1B");
        expect(elements[1].textContent).toEqual("Q1-1A");
    });
    
    it("displays unanswered questions", () => {
        expect(component.getByText("Q1-1A")).toBeInTheDocument();
        expect(component.getByText("Q1-2A")).toBeInTheDocument();
        expect(component.queryByText("Q2-1")).not.toBeInTheDocument();
        expect(component.queryByText("Q2-2")).not.toBeInTheDocument();
    });

    it("displays answered questions", () => {
        fireEvent.click(component.getByText("ANSWERED"));

        expect(component.getByText("Q2-1")).toBeInTheDocument();
        expect(component.getByText("Q2-2")).toBeInTheDocument();
        expect(component.queryByText("Q1-1A")).not.toBeInTheDocument();
        expect(component.queryByText("Q1-2A")).not.toBeInTheDocument();
    });
});