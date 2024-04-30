import { Account } from "@bank/types";
import { http, HttpResponse } from "msw";

const accountList = [
	{ ownerId: 1, currency: "EUR", alias: "Euros Account", balance: 7200 },
	{ ownerId: 2, currency: "USD", alias: "Dollars Account", balance: 1500 },
	{ ownerId: 3, currency: "GBP", alias: "Pounds Account", balance: 50000 },
];

const map = new Map<number, any>();

accountList.forEach(item => map.set(item.ownerId, item))

export const handlers = [
	http.get("/account", () => {
		return HttpResponse.json(Array.from(map.values()));
	}),

	http.put("/account/:id", async ({params, request}) => {
		const { id } = params;
		const newAccount = await request.json();
		map.set(parseInt(id as string), newAccount)

		return HttpResponse.json({})
	}),
	http.delete("/account/:id", async ({params}) => {
		const { id } = params;
		map.delete(parseInt(id as any))

		return HttpResponse.json({})
	}),
];
