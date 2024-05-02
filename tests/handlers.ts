import { http, HttpResponse } from "msw";

const accountList = [
	{ ownerId: 1, currency: "EUR", alias: "Euros Account", balance: 7200 },
	{ ownerId: 2, currency: "USD", alias: "Dollars Account", balance: 1500 },
	{ ownerId: 3, currency: "GBP", alias: "Pounds Account", balance: 50000 },
];

const rates = new Map<string, number>([
	[JSON.stringify({ from: "USD", to: "EUR"}), 0.9],
	[JSON.stringify({ from: "EUR", to: "USD"}), 1.1],
	[JSON.stringify({ from: "USD", to: "GBP"}), 0.8],
	[JSON.stringify({ from: "GBP", to: "USD"}), 1.2],
	[JSON.stringify({ from: "EUR", to: "GBP"}), 0.86],
	[JSON.stringify({ from: "GBP", to: "EUR"}), 1.17],
]);

const transactions = [
    {
        "changeRate": 1.1,
        "fromOwnerId": 1,
        "toOwnerId": 2,
        "transferAmount": "200",
        "amount": 220.00000000000003,
        "id": 1
    },
    {
        "changeRate": 1.17,
        "fromOwnerId": 3,
        "toOwnerId": 1,
        "transferAmount": "100",
        "amount": 117,
        "id": 2
    },
    {
        "changeRate": 1.17,
        "fromOwnerId": 3,
        "toOwnerId": 1,
        "transferAmount": "159",
        "amount": 186.03,
        "id": 3
    }
]


const accountsMap = new Map<number, any>();

accountList.forEach(item => accountsMap.set(item.ownerId, item))

export const handlers = [
	http.get("/account", () => {
		return HttpResponse.json(Array.from(accountsMap.values()));
	}),

	http.put("/account/:id", async ({params, request}) => {
		const { id } = params;
		const newAccount = await request.json();
		accountsMap.set(parseInt(id as string), newAccount)

		return HttpResponse.json({})
	}),

	http.delete("/account/:id", async ({params}) => {
		const { id } = params;
		accountsMap.delete(parseInt(id as any))

		return HttpResponse.json({})
	}),
	http.get("/changeRate/:from/:to", ({ params }) => {
		const rate = rates.get(JSON.stringify({ from: params.from, to: params.to }))

		if(rate) return HttpResponse.json(rate)

		return HttpResponse.json(1);
	}),
	http.post("/transaction", async ({request}) => {
		const transaction = await request.json() as any
		const id = transactions.length + 1
		transactions.push({... transaction, id})
		return HttpResponse.json({})
	}),
	http.get("/transaction", async () => {
		return HttpResponse.json(Array.from(transactions.values()))
	}),
];
