import React from "react";
import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { queryClient } from "@bank/App";
import { writeInField } from "../utils";

describe("Accounts", () => {
	it("Add account", async () => {
		render(<App />);
		await userEvent.click(await screen.findByRole("button", { name: /create new/i }));

		const form = await screen.findByTestId("accountForm");

		await writeInField(form, "Owner ID", "4")
		await writeInField(form, "Alias", "DOP account")
		await writeInField(form, "Currency", "DOP")
		await writeInField(form, "Balance", "500")

		await userEvent.click(await screen.findByRole("button", { name: /Save Account/i }));

		const grid = await screen.findByTestId("grid");

		const row = await within(grid).findByTestId("DOP account");

		expect(row).toBeInTheDocument();

		expect(await within(row).getByText("DOP account")).toBeInTheDocument();
		expect(await within(row).getByText("DOP")).toBeInTheDocument();
		expect(await within(row).getByText("DOP 500.00")).toBeInTheDocument();

	});
	it("Edit account", async () => {
		render(<App />);

		const grid = await screen.findByTestId("grid");
		const row = await within(grid).findByTestId("Euros Account");

		await userEvent.click(await within(row).getByTestId("EditIcon"));

		const form = await screen.findByTestId("accountForm");

		await writeInField(form, "Alias", "DOP account")
		await writeInField(form, "Currency", "DOP")
		await writeInField(form, "Balance", "500")

		await userEvent.click(await screen.findByRole("button", { name: /Save Account/i }));

		const newRow = await within(grid).findByTestId("DOP account");

		expect(newRow).toBeInTheDocument();

		expect(await within(newRow).getByText("DOP account")).toBeInTheDocument();
		expect(await within(newRow).getByText("DOP")).toBeInTheDocument();
		expect(await within(newRow).getByText("DOP 500.00")).toBeInTheDocument();

	});
	it("Delete account", async () => {
		render(<App />);

		const accountName = "Euros Account"

		const grid = await screen.findByTestId("grid");
		const row = await within(grid).findByTestId(accountName);

		await userEvent.click(await within(row).getByTestId("DeleteIcon"));

		const confirmdialog = await screen.findByRole("dialog");
		const confirmButton = await within(confirmdialog).findByRole("button", { name: /yes/i });

		await userEvent.click(confirmButton);

		const removedRow = await within(grid).queryByTestId(accountName);
		expect(removedRow).toBeNull()
	});
	it("Filter account", async () => {

		console.log(queryClient.getQueryState(["listAccount"]))
	});
	it("List account has error", async () => {
		render(<App />);
	});
});
