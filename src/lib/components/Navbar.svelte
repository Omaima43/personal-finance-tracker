<script lang="ts">
	import { goto } from '$app/navigation';

	function handleLogout() {
		localStorage.removeItem('username');
		goto('/homepage');
	}
</script>

<nav>
	<div class="nav-left">
		<a href="/homepage"> Finance App</a>
	</div>
	<div class="nav-right">
		<a href="/dashboard">Dashboard</a>
		<a href="/budget">Budget</a>
		<button on:click={handleLogout}>Logout</button>
	</div>
</nav>

<style>
    nav {
        background-color: var(--primary);
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
        box-shadow: var(--shadow);
    }

    .nav-left a {
        font-size: 1.2rem;
        font-weight: bold;
        color: white;
    }

    .nav-right {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .nav-right a {
        color: white;
        font-weight: 500;
    }

    .nav-right button {
        background-color: white;
        color: var(--primary);
        font-weight: bold;
        padding: 0.4rem 0.8rem;
        border-radius: var(--radius);
        border: none;
        cursor: pointer;
    }

    .nav-right button:hover {
        background-color: #e0f3eb;
    }
</style>
