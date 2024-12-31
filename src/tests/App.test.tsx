import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
  it("renders the App component", async () => {
    render(<App />);
    await screen.findByRole("button");
    expect(screen.getByRole("button")).toHaveTextContent("Hello");
  });
});
