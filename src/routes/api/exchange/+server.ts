import axios from 'axios';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		const response = await axios.get('https://open.er-api.com/v6/latest/USD');
		const rates = response.data.rates;

		return json({
			USD: 1,
			EUR: rates.EUR,
			HUF: rates.HUF
		});
	} catch (error) {
		console.error('Exchange API failed', error);
		return json({ error: 'Failed to fetch exchange rates' }, { status: 500 });
	}
};
