import { http, HttpResponse } from 'msw';

const accountList = [
    {ownerId: 1, currency: "EUR", alias: "Euros Account", amount: 500 },
    {ownerId: 2, currency: "USD", alias: "Dollars Account", amount: 1500 },
    {ownerId: 3, currency: "DOP", alias: "Pesos Account", amount: 50000 },
]


export const handlers = [
    http.get('http://localhost:3000/accounts', () => {
        console.log("here")
        return HttpResponse.json(accountList)
    }),
]