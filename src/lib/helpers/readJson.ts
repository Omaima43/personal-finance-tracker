import { readFile } from 'fs/promises';

export async function readJson<T>(path: string): Promise<T> {
	const data = await readFile(path, 'utf-8');
	return JSON.parse(data) as T;
}
