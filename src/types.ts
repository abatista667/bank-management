export interface Account {
	ownerId: number;
	currency: string;
	alias: string;
	balance: number;
}

export type EditMode = "create" | "edit";
