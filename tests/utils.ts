import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const writeInField = async (form: HTMLElement, name: string, value: string) => {
	const field = await within(form).findByRole("generic", { name: new RegExp(name, "i") })
	const textBox = within(field).getByRole("textbox");
	await userEvent.clear(textBox)
	await userEvent.type(textBox, value)
}