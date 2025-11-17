import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";



describe("renders button text", () => {
    it("should render title as Rahul", () => {
        render(<Button />);
        const element = screen.getByText(/Click me/);
        expect(element).toBeInTheDocument();
        expect(screen.getByTitle("Rahul")).toBeInTheDocument();
    })

    it("should render textbox ", () => {
        render(<Button />);
        expect(screen.getByRole("textbox")).toBeInTheDocument()
        expect(screen.getByPlaceholderText("Enter")).toBeInTheDocument()
        expect(screen.getByRole("textbox")).toHaveAttribute("name", "username");
        expect(screen.getByRole("textbox")).toHaveAttribute("name");
        expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    })
});



describe("test event handlers on input type text", () => {
    it("onchange event handling", () => {
        render(<Button />)
        let inputElement = screen.getByRole("textbox") as HTMLInputElement;
        fireEvent.change(inputElement, { target: { value: "a" } });
        expect(inputElement?.value).toBe("a")
        expect(inputElement).toHaveValue("a")
    })

    it("testing onClick event", () => {
        render(<Button />);
        const btnElement = screen.getByRole("button");
        fireEvent.click(btnElement);
        expect(screen.getByText("Hiii there")).toBeInTheDocument()
    })

    it("snapshot for Button component", () => {
        const component = render(<Button />);
        expect(component).toMatchSnapshot();
    })
})
