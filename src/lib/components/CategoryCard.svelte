<script lang="ts">
	import SpendingForm from '$lib/components/SpendingForm.svelte';
	import TransactionList from '$lib/components/TransactionList.svelte';
	import type { Category, Transaction } from '$lib/index.ts';

	export let category: Category;
	export let transactions: Transaction[] = [];
	export let onSpend: (categoryId: string, amount: number) => void;
	export let onLimitUpdate: (categoryId: string, newLimit: number) => void;
	export let onDelete: (categoryId: string) => void;

	let updatedLimit = category.limit;
</script>

<div class={`category-card ${category.spent > category.limit ? 'over-limit' : ''}`}>

	<button class="delete-button" on:click={() => onDelete(category.id)}>🗑</button>
	<h3>{category.name}</h3>

	<div class="limit-section">
		<label><strong>Limit:</strong></label>
		<input type="number" bind:value={updatedLimit} min="0" />
		<span>$</span>
		<button on:click={() => onLimitUpdate(category.id, updatedLimit)}>Update</button>
	</div>

	<p class="spent">Spent: {category.spent}$</p>

	{#if category.spent > category.limit}
		<p class="warning">Above Budget!</p>
	{/if}

	<SpendingForm categoryId={category.id} onSpend={onSpend} />
	<TransactionList transactions={transactions} categoryId={category.id} />
</div>

<style>
    .category-card {
        position: relative;
        background-color: var(--bg-card);
        padding: 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        margin-bottom: 2rem;
        border: 2px solid #e0e0e0;
    }
    .category-card.over-limit {
        border: 2px solid #f44336;
    }

    .delete-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: none;
        border: none;
        font-size: 1.2rem;
        color: #666;
        cursor: pointer;
    }

    .delete-button:hover {
        color: #f44336;
    }

    .limit-section {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        margin-bottom: 0.5rem;
    }

    .spent {
        margin-bottom: 0.5rem;
    }

    .warning {
        color: red;
        font-weight: bold;
    }
</style>
