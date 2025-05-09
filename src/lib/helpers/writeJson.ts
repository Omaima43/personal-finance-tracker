import { writeFile } from 'fs/promises';

export async function writeJson(path: string, data: unknown): Promise<void> {
	await writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
}
