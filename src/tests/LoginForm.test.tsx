import userEvent from "@testing-library/user-event";
import LoginForm from "../components/LoginForm";
import { fireEvent, render, screen, within } from "@testing-library/react";

describe("testing the loginform", () => {
    it("should render login form", () => {
        render(<LoginForm />);
        const formElement = screen.getByRole("form");
        expect(formElement).toBeInTheDocument();
    })
    it("should render form inputs inside form", () => {
        render(<LoginForm />);
        const formElement = screen.getByRole("form");
        const inputsInsideForm = within(formElement).getAllByRole("textbox")
        expect(inputsInsideForm.length).toBe(2);
    })
    it("form should have a submit button", () => {
        render(<LoginForm />);
        const submitBtn = screen.getByRole("button", { name: "Submit" });
        expect(submitBtn).toBeInTheDocument()
    })

    it("should be able to enter email and password on onChange", () => {
        render(<LoginForm />);
        // Arragne
        const emailInput = screen.getAllByRole("textbox")[0];
        const passInput = screen.getAllByRole("textbox")[1];
        // Assert for email
        expect(emailInput).toHaveAttribute("name", "email");
        expect(emailInput).toHaveAttribute("type", "email");
        expect(screen.getByPlaceholderText("Write Email Here")).toBeInTheDocument();
        fireEvent.change(emailInput, { target: { value: "Rahul" } });
        expect(emailInput).toHaveValue("Rahul");

        //Assert for Password
        expect(passInput).toHaveAttribute("name", "password");
        expect(passInput).toHaveAttribute("type", "text");
        fireEvent.change(passInput, { target: { value: "123456" } });
        expect(passInput).toHaveValue("123456");
    })

    it("should submit form with proper values without validation", async () => {
        render(<LoginForm />);
        const emailInput = screen.getByPlaceholderText("Write Email Here");
        const passwordInout = screen.getByPlaceholderText("Password Here");
        await userEvent.type(emailInput, "Rahul@gmail.com");
        await userEvent.type(passwordInout, "123456");
        const logSpy = vi.spyOn(console, "log").mockImplementation(() => { });
        await userEvent.click(screen.getByRole("button", { name: /submit/i }));
        expect(logSpy).toHaveBeenCalledWith("Form submitted", {
            email: "Rahul@gmail.com",
            password: "123456",
        });
    })

    it("should not submit without validation",()=>{
        
    })

})