import { createNewStore } from "../../app/store";
import { render, getByTestId, getByText, fireEvent, waitFor, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import LoginPage from "../LoginPage";

describe("Login Page", () => {
    let storeInTest;
    let component;

    beforeEach(() => {
        storeInTest = createNewStore();

        component = render(
            <Provider store={storeInTest}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
    });

    it("allows to sign in", async () => {
        expect(storeInTest.getState().authedUser).toBeNull();

        const userInput = component.getByTestId("login-input");
        const passInput = component.getByTestId("password-input");
        const loginButton = component.getByText("Sign In");

        fireEvent.change(userInput, { target: { value: "tylermcginnis" } });
        fireEvent.change(passInput, { target: { value: "abc321" } });
        fireEvent.click(loginButton);
        
        await waitFor(() => {
            return expect(storeInTest.getState().authedUser).not.toBeNull();
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