<script lang="ts">
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';

	async function handleLogin() {
		const res = await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password,
				action: 'login'
			})
		});

		const data = await res.json();

		if (data.success) {
			alert('Login successful!');
			localStorage.setItem('username', username);
			goto('/dashboard');
		} else {
			alert(data.error || 'Login failed');
		}
	}
</script>

<main class="login-page">
	<h1>Login</h1>

	<form on:submit|preventDefault={handleLogin}>
		<input type="text" placeholder="Username" bind:value={username} required />
		<input type="password" placeholder="Password" bind:value={password} required />
		<button type="submit">Login</button>
	</form>
</main>

<style>
    .login-page {
        text-align: center;
        padding: 2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 300px;
        margin: 0 auto;
    }


</style>
