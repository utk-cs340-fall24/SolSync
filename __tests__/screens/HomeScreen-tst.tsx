import { render } from "@testing-library/react-native";

import HomeScreen from "@/screens/HomeScreen";

describe("HomeScreen", () => {
  it("renders the HomeScreen", () => {
    const { getByText } = render(<HomeScreen />);

    // has the word hello
    expect(getByText("Hello")).toBeTruthy();
  });
});
