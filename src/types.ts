import { transactionValidationSchema } from "./constants/validationSchemas";
import * as yup from "yup";

export interface Account {
	ownerId: number;
	currency: string;
	alias: string;
	balance: number;
}

export type EditMode = "create" | "edit";

export type Transaction = yup.InferType<typeof transactionValidationSchema> & {
	transactionId: string;
	changeRate: number;
};
