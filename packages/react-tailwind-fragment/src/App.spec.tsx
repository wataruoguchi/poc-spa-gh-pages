import App from "./App";
import { render, fireEvent, screen } from "@testing-library/react";

describe("App", () => {
  it("should render", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: "count is 0" });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: "count is 1" }),
    ).toBeInTheDocument();
  });
});
