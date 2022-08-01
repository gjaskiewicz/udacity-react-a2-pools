import { createNewStore } from "../../app/store";
import { render, queryAllByText } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import LeaderboardPage from "../LeaderboardPage";

describe("Leaderboard page", () => {
    let storeInTest;
    let component;

    beforeEach(() => {
        const preloadedState = {
            users: {
                usr2: {
                    id: 'usr2',
                    name: 'USER 2',
                    answers: {
                      "q1": 'optionOne',
                      "q2": 'optionOne'
                    },
                    questions: []
                },
                usr3: {
                    id: 'usr3',
                    name: 'USER 3',
                    answers: { },
                    questions: ['q21', 'q31', 'q41']
                },
                usr1: {
                    id: 'usr1',
                    name: 'USER 1',
                    answers: {
                      "q1": 'optionOne',
                      "q2": 'optionOne'
                    },
                    questions: ['q3', 'q4']
                },
            },
            questions: {},
            authedUser: 'usr3'
        };
        storeInTest = createNewStore(preloadedState);

        component = render(
            <Provider store={storeInTest}>
                <MemoryRouter>
                    <LeaderboardPage />
                </MemoryRouter>
            </Provider>
        );
    });

    it("Should display correct order", () => {
        const values = component.queryAllByText(/USER [0-9]/);

        expect(values.length).toEqual(3);
        expect(values[0].textContent).toBe("USER 1");
        expect(values[1].textContent).toBe("USER 3");
        expect(values[2].textContent).toBe("USER 2");
    });

});