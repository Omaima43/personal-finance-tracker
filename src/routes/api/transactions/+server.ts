import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { readJson } from '$lib/helpers/readJson';
import { writeJson } from '$lib/helpers/writeJson';
import path from 'path';

type Transaction = {
	id: string;
	categoryId: string;
	amount: number;
	date: string;
};

type UserTransactions = {
	username: string;
	transactions: Transaction[];
};

const TRANSACTIONS_PATH = path.resolve('static/data/transactions.json');

//Return transactions
export const GET: RequestHandler = async ({ url }) => {
	const username = url.searchParams.get('username');
	if (!username) return json({ error: 'Username is required' }, { status: 400 });

	const data = await readJson<UserTransactions[]>(TRANSACTIONS_PATH);
	const record = data.find(r => r.username === username);

	return json({ transactions: record?.transactions ?? [] });
};

// Save new transactions
export const POST: RequestHandler = async ({ request }) => {
	const { username, transaction } = await request.json();

	if (!username || !transaction) {
		return json({ error: 'Missing data' }, { status: 400 });
	}

	const data = await readJson<UserTransactions[]>(TRANSACTIONS_PATH);
	let userRecord = data.find(r => r.username === username);

	if (!userRecord) {
		userRecord = { username, transactions: [transaction] };
		data.push(userRecord);
	} else {
		userRecord.transactions.push(transaction);
	}

	await writeJson(TRANSACTIONS_PATH, data);
	return json({ success: true });
};
