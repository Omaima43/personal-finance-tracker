export type Category = {
	id: string;
	name: string;
	limit: number;
	spent: number;
};


export type Transaction = {
	id: string;
	categoryId: string;
	amount: number;
	date: string;
};

