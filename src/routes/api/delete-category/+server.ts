import { json } from '@sveltejs/kit';
import { readJson } from '$lib/helpers/readJson';
import { writeJson } from '$lib/helpers/writeJson';
import path from 'path';
import type { Category, Transaction } from '$lib/index.ts';

type BudgetUser = {
	username: string;
	categories: Category[];
};

const BUDGETS_PATH = path.resolve('static/data/budgets.json');
const TRANSACTIONS_PATH = path.resolve('static/data/transactions.json');

export async function POST({ request }) {
	const { username, categoryId } = await request.json();

	if (!username || !categoryId) {
		return json({ error: 'Invalid request' }, { status: 400 });
	}

	const budgets = (await readJson(BUDGETS_PATH)) as BudgetUser[];

	const updatedBudgets = budgets.map((user) => {
		if (user.username === username) {
			const updatedCategories = user.categories.filter(
				(c) => c.id !== categoryId
			);
			return { ...user, categories: updatedCategories };
		}
		return user;
	});

	await writeJson(BUDGETS_PATH, updatedBudgets);

	const transactions = (await readJson(TRANSACTIONS_PATH)) as Transaction[];
	const updatedTransactions = transactions.filter(
		(t) => t.categoryId !== categoryId
	);
	await writeJson(TRANSACTIONS_PATH, updatedTransactions);

	return json({ success: true });
}
