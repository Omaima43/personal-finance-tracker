<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getCurrentUser } from '$lib/helpers/auth';
	import PieChart from '$lib/components/PieChart.svelte';
	import CategoryCard from '$lib/components/CategoryCard.svelte';

	type Category = {
		id: string;
		name: string;
		limit: number;
		spent: number;
	};

	type Transaction = {
		id: string;
		categoryId: string;
		amount: number;
		date: string;
	};

	let username: string | null = null;
	let categories: Category[] = [];
	let transactions: Transaction[] = [];

	let newCategoryName = '';
	let newCategoryLimit = 0;

	let totalExpenses = 0;

	let chartLabels: string[] = [];
	let chartData: number[] = [];

	onMount(async () => {
		username = getCurrentUser();
		if (!username) {
			alert('Please log in first.');
			goto('/login');
			return;
		}

		const catRes = await fetch(`/api/budget?username=${username}`);
		const catData = await catRes.json();
		categories = catData.categories || [];

		const txRes = await fetch(`/api/transactions?username=${username}`);
		const txData = await txRes.json();
		transactions = txData.transactions || [];

		recalculateSpentFromTransactions();
		calculateExpenses();
	});


	async function addCategory() {
		if (!newCategoryName || newCategoryLimit <= 0 || !username) {
			alert('Invalid input');
			return;
		}

		const newCat: Category = {
			id: crypto.randomUUID(),
			name: newCategoryName,
			limit: newCategoryLimit,
			spent: 0
		};

		categories.push(newCat);
		categories = [...categories];
		newCategoryName = '';
		newCategoryLimit = 0;
		calculateExpenses();

		await fetch('/api/budget', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, category: newCat })
		});
	}

	async function submitSpending(categoryId: string, amount: number) {
		const cat = categories.find(c => c.id === categoryId);
		if (!cat || amount <= 0 || !username) return;

		cat.spent += amount;
		categories = [...categories];
		const tx: Transaction = {
			id: crypto.randomUUID(),
			categoryId,
			amount,
			date: new Date().toISOString()
		};
		transactions = [
			...transactions,
			{
				id: crypto.randomUUID(),
				categoryId,
				amount,
				date: new Date().toISOString()
			}
		];
		calculateExpenses();

		await fetch('/api/transactions', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, transaction: tx })
		});

		await fetch('/api/budget', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, category: cat })
		});

	}

	function calculateExpenses() {
		recalculateSpentFromTransactions();
		totalExpenses = categories.reduce((sum, c) => sum + c.spent, 0);
		chartLabels = categories.map(c => c.name);
		chartData = categories.map(c => c.spent);
	}

	function recalculateSpentFromTransactions() {
		for (const cat of categories) {
			cat.spent = transactions
				.filter(t => t.categoryId === cat.id)
				.reduce((sum, t) => sum + t.amount, 0);
		}
	}
	async function updateCategoryLimit(categoryId: string, newLimit: number) {
		const cat = categories.find(c => c.id === categoryId);
		if (!cat || newLimit <= 0 || !username) return;

		cat.limit = newLimit;
		categories = [...categories];

		await fetch('/api/budget', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, category: cat })
		});

		calculateExpenses();
	}

	async function deleteCategory(categoryId: string) {
		categories = categories.filter(c => c.id !== categoryId);

		await fetch('/api/delete-category', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, categoryId })
		});

		calculateExpenses();
		recalculateSpentFromTransactions();
	}


</script>

<main class="budget-page">
	<h1>Budget Manager</h1>

	<section>
		<h2>Add New Category</h2>
		<input type="text" placeholder="Category name" bind:value={newCategoryName} />
		<input type="number" placeholder="Limit" bind:value={newCategoryLimit} />
		<button on:click={addCategory}>Add Category</button>
	</section>

	<section>
		<h2>Categories</h2>
		<p><strong>Total Expenses:</strong> {totalExpenses}$</p>

		<div class="grid">
			{#each categories as category}
				<CategoryCard
					{category}
					{transactions}
					onSpend={submitSpending}
					onLimitUpdate={updateCategoryLimit}
					onDelete={deleteCategory}
				/>
			{/each}
		</div>


	</section>

	<section>
		<h2>Spending Chart</h2>

		{#if chartData.length > 0}
			<PieChart labels={chartLabels} data={chartData} />
		{:else}
			<p>No data</p>
		{/if}
	</section>
</main>

<style>
    .budget-page {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
    }

    section {
        margin-bottom: 2rem;
    }

</style>
