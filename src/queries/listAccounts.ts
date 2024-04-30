import axios from "axios"
import { apiRoutes } from "./apiRoutes"
import { Account } from "@bank/types"
import { useQuery } from "@tanstack/react-query"


const listAccount = () => {
    return axios.get<Account[]>(apiRoutes.listAccount)
}

export const useListAccount = () => useQuery({
    queryFn: listAccount,
    queryKey: ["listAccount"]
})