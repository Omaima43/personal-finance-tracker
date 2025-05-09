import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { readJson } from '$lib/helpers/readJson';
import { writeJson } from '$lib/helpers/writeJson';
import path from 'path';

type User = {
	username: string;
	password: string;
	balance: number;
};

const USERS_PATH = path.resolve('static/data/users.json');


export const GET: RequestHandler = async ({ url }) => {
	const username = url.searchParams.get('username');
	if (!username) {
		return json({ error: 'Username required' }, { status: 400 });
	}

	const users = await readJson<User[]>(USERS_PATH);
	const user = users.find(u => u.username === username);

	if (!user) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	return json(user);
};


export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { username, password, action } = body;

	if (!username || !password || !action) {
		return json({ error: 'Missing fields' }, { status: 400 });
	}

	const users = await readJson<User[]>(USERS_PATH);

	if (action === 'register') {
		const existing = users.find(u => u.username === username);
		if (existing) {
			return json({ error: 'User already exists' }, { status: 409 });
		}

		const newUser: User = {
			username,
			password,
			balance: 0
		};

		users.push(newUser);
		await writeJson(USERS_PATH, users);
		return json({ success: true, user: newUser });
	}

	if (action === 'login') {
		const found = users.find(u => u.username === username && u.password === password);
		if (!found) {
			return json({ error: 'Invalid credentials' }, { status: 401 });
		}
		return json({ success: true, user: found });
	}

	return json({ error: 'Invalid action' }, { status: 400 });
};


export const PATCH: RequestHandler = async ({ request }) => {
	const { username, balance } = await request.json();

	if (!username || typeof balance !== 'number') {
		return json({ error: 'Missing username or balance' }, { status: 400 });
	}

	const users = await readJson<User[]>(USERS_PATH);
	const user = users.find(u => u.username === username);

	if (!user) {
		return json({ error: 'User not found' }, { status: 404 });
	}

	user.balance = balance;
	await writeJson(USERS_PATH, users);

	return json({ success: true });
};
