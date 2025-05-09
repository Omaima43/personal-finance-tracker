<script lang="ts">
	import { goto } from '$app/navigation';

	let username = '';
	let password = '';
	let confirmPassword = '';

	async function handleRegister() {
		if (password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		const res = await fetch('/api/users', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password,
				action: 'register'
			})
		});

		const data = await res.json();

		if (data.success) {
			alert('Registration successful!');
			localStorage.setItem('username', username);
			goto('/dashboard');
		} else {
			alert(data.error || 'Registration failed');
		}
	}
</script>

<main class="register-page">
	<h1>Register</h1>

	<form on:submit|preventDefault={handleRegister}>
		<input type="text" placeholder="Username" bind:value={username} required />
		<input type="password" placeholder="Password" bind:value={password} required />
		<input type="password" placeholder="Confirm Password" bind:value={confirmPassword} required />
		<button type="submit">Register</button>
	</form>
</main>

<style>
    .register-page {
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
