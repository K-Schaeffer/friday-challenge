import { render } from "@testing-library/vue";
import index from "./pages/index.vue";

describe("App", () => {
  it("renders index", () => {
    const { getByText } = render(index);

    expect(getByText("Transactions")).toBeVisible();
  });
});
