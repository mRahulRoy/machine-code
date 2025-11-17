import { render, screen } from "@testing-library/react";
import { UserInfo } from "../app/design-pattern/hofs/page";

describe("WithLoader HOC API Test", () => {
  test("renders 10 todos after loading", async () => {
    render(<UserInfo />);

    // Optionally check loader first
    // screen.debug(); // use this if you want to see what's rendered

    // ✅ Use findAllByRole which waits automatically
    const todos = await screen.findAllByRole("listitem", {}, { timeout: 5000 });

    expect(todos).toHaveLength(10);
    expect(todos[0]).toHaveTextContent("Todo 1");
  });
});
