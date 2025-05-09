<script lang="ts">
	import { goto } from '$app/navigation';
	import { logout } from '$lib/helpers/auth';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	function handleLogout() {
		logout();
		goto('/homepage');
	}
</script>

<div class="layout">
	<Navbar/>

	<main class="content">
		<slot />
	</main>

	<Footer/>
</div>

<style>
    .layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: var(--bg-light);
    }

    .content {
        flex: 1;
        padding: 2rem 1rem;
        max-width: var(--max-width);
        margin: 0 auto;
    }
</style>