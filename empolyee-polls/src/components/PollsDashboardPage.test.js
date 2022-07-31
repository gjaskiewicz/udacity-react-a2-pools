import { createNewStore } from "../app/store";
import { render, getByText, queryByText, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import PollsDashboardPage from "./PollsDashboardPage";

describe("Polls Dashboard page", () => {
    let storeInTest;
    let component;

    beforeEach(() => {
        const preloadedState = {
            users: {
                usr1: {
                    id: 'usr1',
                    name: 'USER 1',
                    answers: {
                      "q1": 'optionOne'
                    },
                    questions: ['q1', 'q2']
                },
            },
            questions: {
                q1: {
                    id: 'q1',
                    author: 'usr1',
                    timestamp: 1467166872634,
                    optionOne: {
                      votes: [],
                      text: 'Q1-1',
                    },
                    optionTwo: {
                      votes: [],
                      text: 'Q1-2'
                    }
                },
                q2: {
                    id: 'q2',
                    author: 'usr1',
                    timestamp: 1467166872634,
                    optionOne: {
                      votes: [ 'usr1' ],
                      text: 'Q2-1',
                    },
                    optionTwo: {
                      votes: [],
                      text: 'Q2-2'
                    }
                }
            },
            authedUser: 'usr1'
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

    it('displays unanswered questions', () => {
        expect(component.queryByText("Q1-2")).not.toBeInTheDocument();
        expect(component.queryByText("Q1-2")).not.toBeInTheDocument();
        expect(component.getByText("Q2-2")).toBeInTheDocument();
        expect(component.getByText("Q2-2")).toBeInTheDocument();
    });

    it('displays answered questions', () => {
        fireEvent.click(component.getByText("ANSWERED"));

        expect(component.getByText("Q1-2")).toBeInTheDocument();
        expect(component.getByText("Q1-2")).toBeInTheDocument();
        expect(component.queryByText("Q2-2")).not.toBeInTheDocument();
        expect(component.queryByText("Q2-2")).not.toBeInTheDocument();
    });

    it('displays answered questions', () => {

    });
});