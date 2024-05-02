import React from "react";
import { render } from "@testing-library/react";
import App from "@bank/App";

describe("Transaction", () => {
	it("Add transaction", async () => {
		render(<App />);
	});

	it("List transaction has error", async () => {
		render(<App />);
	});
});
