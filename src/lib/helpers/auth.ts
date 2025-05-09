export function getCurrentUser(): string | null {
	if (typeof localStorage === 'undefined') return null;
	return localStorage.getItem('username');
}


export function logout(): void {
	localStorage.removeItem('username');
}
