<script lang="ts">
	import type { Transaction } from '$lib/index.ts';
	export let transactions: Transaction[] = [];
	export let categoryId: string;
</script>

<div class="transactions">
	<h4>Transactions:</h4>
	{#if transactions.filter(t => t.categoryId === categoryId).length > 0}
		<ul>
			{#each transactions.filter(t => t.categoryId === categoryId) as t}
				<li>
					<span class="amount">{t.amount}$</span>
					<span class="date">{new Date(t.date).toLocaleDateString()}</span>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="no-transactions">No transactions yet.</p>
	{/if}
</div>

<style>
    .transactions {
        margin-top: 1.5rem;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        display: flex;
        justify-content: space-between;
        background: #f5f5f5;
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius);
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
    }

    .amount {
        color: var(--primary);
        font-weight: bold;
    }

    .date {
        color: var(--text-muted);
    }

    .no-transactions {
        font-style: italic;
        color: var(--text-muted);
        margin-top: 0.5rem;
    }
</style>