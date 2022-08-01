import { createNewStore } from "../app/store";
import { render, getByText, queryByText, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";


import App from "../App";

describe("App", () => {

    const setupComponent = (initialRoute, authedUser = "usr1") => {
        const storeInTest = createNewStore({
            users: { 
                "usr1": {
                    id: "usr1",
                    name: "TEST",
                    answers: [ ]
                }
            },
            questions: { 
                "q1": {
                    id: "q1",
                    optionOne: {
                        text: "Q1-1"
                    },
                    optionTwo: {
                        text: "Q1-2"
                    }
                }
            },
            authedUser
        });
        return render(
            <Provider store={storeInTest}>
                <MemoryRouter initialEntries={[initialRoute]}>
                    <App />
                </MemoryRouter>
            </Provider>
        );
    };

    it("should show logon when not authed on '/' path", () => {
        const component = setupComponent("/signin", null);
        expect(component.getByText("Log in")).toBeInTheDocument();
    });

    it("should show logon when not authed on '/questions/id' path", () => {
        const component = setupComponent("/questions/id", null);
        expect(component.getByText("Log in")).toBeInTheDocument();
    });

    it("should show dashboard on '/'", () => {
        const component = setupComponent("/");
        expect(component.getByText("Polls")).toBeInTheDocument();
    });

    it("should show new question on 'add'", () => {
        const component = setupComponent("/add");
        expect(component.getByText("Create new question")).toBeInTheDocument();
    });

    it("should show leaderboard on 'leaderboard'", () => {
        const component = setupComponent("/leaderboard");
        expect(component.getByText("Leaderboard", {selector: "span"})).toBeInTheDocument();
    });

    it("should show question for /questions/id", () => {
        const component = setupComponent("/questions/q1");
        expect(component.getByText("Q1-1")).toBeInTheDocument();
        expect(component.getByText("Q1-2")).toBeInTheDocument();
    });

    it("should show 404 on not exisiting question", () => {
        const component = setupComponent("/questions/q3");
        expect(component.getByText("404: No such question")).toBeInTheDocument();
    });
});