import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Fallback from "../src/pages/index";

jest.mock("next/router", () => require("next-router-mock"));

describe("Fallback", () => {
  it("renders a heading", () => {
    const weatherData = {
      name: "test",
      main: {
        temp: 13,
      },
      wind: {
        speed: 34,
      },
    };

    render(<Fallback weatherData={weatherData} />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
