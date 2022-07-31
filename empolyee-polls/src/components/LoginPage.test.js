import { createNewStore } from "../app/store";
import { render, getByTestId, getByText, fireEvent, waitFor, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import LoginPage from "./LoginPage";

describe("Login Page", () => {
    let storeInTest;
    let component;
    let history;

    beforeEach(() => {
        history = createMemoryHistory({ initialEntries: ['/signin'] });
        storeInTest = createNewStore();

        component = render(
            <Provider store={storeInTest}>
                <Router location={history.location} navigator={history} >
                    <LoginPage />
                </Router>
            </Provider>
        );
    });

    it("allows to sign in", async () => {
        const userInput = component.getByTestId("login-input");
        const passInput = component.getByTestId("password-input");
        const loginButton = component.getByText("Sign In");

        expect(history.location.pathname).toBe('/signin');

        fireEvent.change(userInput, { target: { value: "tylermcginnis" } });
        fireEvent.change(passInput, { target: { value: "abc321" } });
        fireEvent.click(loginButton);
        
        await waitFor(() => {
            return expect(history.location.pathname).toEqual('/');
        }, { timeout: 5000, interval: 1000 });
    });

    it("shows error message on failed logon", async () => {
        const userInput = component.getByTestId("login-input");
        const passInput = component.getByTestId("password-input");
        const loginButton = component.getByText("Sign In");

        act(() => {
            fireEvent.change(userInput, { target: { value: "tylermcginnis" } });
            fireEvent.change(passInput, { target: { value: "def456" } });
            fireEvent.click(loginButton);
        });
        await waitFor(() => {
            return expect(component.getByTestId("login-error")).toBeInTheDocument();
        }, { timeout: 5000 });        
    });
});