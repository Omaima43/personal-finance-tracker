import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { readJson } from '$lib/helpers/readJson';
import { writeJson } from '$lib/helpers/writeJson';
import path from 'path';

type Category = {
	id: string;
	name: string;
	limit: number;
	spent: number;
};

type BudgetRecord = {
	username: string;
	categories: Category[];
};

const BUDGETS_PATH = path.resolve('static/data/budgets.json');

export const GET: RequestHandler = async ({ url }) => {
	const username = url.searchParams.get('username');
	if (!username) return json({ error: 'Username is required' }, { status: 400 });

	const data = await readJson<BudgetRecord[]>(BUDGETS_PATH);
	const record = data.find(r => r.username === username);

	return json({ categories: record?.categories ?? [] });
};

export const POST: RequestHandler = async ({ request }) => {
	const { username, category } = await request.json();

	if (!username || !category) {
		return json({ error: 'Missing data' }, { status: 400 });
	}

	const data = await readJson<BudgetRecord[]>(BUDGETS_PATH);
	let userRecord = data.find(r => r.username === username);

	if (!userRecord) {
		userRecord = { username, categories: [category] };
		data.push(userRecord);
	} else {
		const index = userRecord.categories.findIndex(c => c.id === category.id);
		if (index !== -1) {
			userRecord.categories[index] = category; // update
		} else {
			userRecord.categories.push(category); // add
		}
	}

	await writeJson(BUDGETS_PATH, data);
	return json({ success: true });
};
