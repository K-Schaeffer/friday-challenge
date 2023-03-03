import "@testing-library/jest-dom";
import { server } from "./unit/mocks/server";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
