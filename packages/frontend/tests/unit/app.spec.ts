import { render } from "@testing-library/vue";
import app from "./app.vue";

describe("App", () => {
  it("renders app", () => {
    const { getByText } = render(app);

    expect(getByText("Hello there!")).toBeVisible();
  });
});
