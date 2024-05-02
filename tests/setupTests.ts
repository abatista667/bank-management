import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";

import { setupServer } from "msw/node";
import { handlers, resetAccountsMap } from "./handlers";
import { queryClient } from "@bank/App";

export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
    server.resetHandlers()
    queryClient.removeQueries()
    resetAccountsMap()
});

afterAll(() => server.close());
