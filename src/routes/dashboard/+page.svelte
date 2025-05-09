<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getCurrentUser } from '$lib/helpers/auth';
	import BalanceCard from '$lib/components/BalanceCard.svelte';
	import ExchangeRateCard from '$lib/components/ExchangeRateCard.svelte';



	let username: string | null = null;
	let balance = 0;
	let newBalance = 0;
	let euroRate = 0;
	let hufRate = 0;

	onMount(async () => {
		username = getCurrentUser();
		if (!username) {
			alert('Please log in first.');
			goto('/login');
			return;
		}

		const userRes = await fetch(`/api/users?username=${username}`);
		const userData = await userRes.json();
		balance = userData.balance;
		newBalance = balance;

		const rateRes = await fetch('/api/exchange');
		const rateData = await rateRes.json();
		euroRate = rateData.EUR;
		hufRate = rateData.HUF;
	});

	async function updateBalance() {
		const res = await fetch('/api/users', {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, balance: newBalance })
		});

		const data = await res.json();
		if (data.success) {
			balance = newBalance;
			alert('Balance updated!');
		} else {
			alert(data.error || 'Failed to update balance');
		}
	}
</script>

<main class="dashboard">
	<h1>Welcome {username}</h1>
	<div class="cards-container">
	<BalanceCard
		{balance}
		{newBalance}
		onUpdate={updateBalance}
		bindNewBalance={(val) => newBalance = val}
	/>


	<ExchangeRateCard rates={{ EUR: euroRate, HUF: hufRate}} />
	</div>

</main>

<style>
    .dashboard {
        text-align: center;
        padding: 2rem;
    }

    .cards-container {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
        margin-top: 2rem;

    }
</style>
