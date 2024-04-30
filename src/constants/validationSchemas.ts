import * as yup from "yup";
import { errorMessage } from "./errorMessage";

export const transactionValidationSchema = yup.object({
	fromOwnerId: yup
		.number()
		.required(errorMessage.required)
		.typeError(errorMessage.numeric),
	toOwnerId: yup
		.number()
		.required(errorMessage.required)
		.typeError(errorMessage.numeric),
	toCurrency: yup.string().required(errorMessage.required),
	amount: yup
		.number()
		.required(errorMessage.required)
		.typeError(errorMessage.numeric),
});
