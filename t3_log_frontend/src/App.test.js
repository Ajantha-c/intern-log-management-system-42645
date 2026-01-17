import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders role selection cards", () => {
  render(<App />);
  expect(screen.getByText(/Mentor/i)).toBeInTheDocument();
  expect(screen.getByText(/Intern/i)).toBeInTheDocument();
});
