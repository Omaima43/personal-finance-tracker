<script lang="ts">
	import { goto } from '$app/navigation';

	function handleLogin() {
		goto('/login');
	}

	function handleRegister() {
		goto('/register');
	}
</script>

<main class="homepage">
	<h1>Welcome to the Personal Finance Tracker</h1>
	<p>Manage your budgets, track your expenses, and stay on top of your finances!</p>

	<div class="button-group">
		<button on:click={handleLogin}>Login</button>
		<button on:click={handleRegister}>Register</button>
	</div>
</main>

<style>
    .homepage {
        text-align: center;
        padding: 2rem;
    }

</style>
