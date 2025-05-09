<script lang="ts">
	export let rates: { [currency: string]: number };
</script>

<div class="exchange-card">
	<h4>Exchange Rates</h4>
	<ul>
		{#each Object.entries(rates) as [currency, rate]}
			<li><strong>1 USD = {rate}</strong> {currency}</li>
		{/each}
	</ul>
</div>

<style>
    .exchange-card {
        background-color: var(--bg-card);
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        border: 2px solid #e0e0e0;
        max-width: 300px;
        margin-top: 1.5rem;
    }

    h4 {
        margin-top: 0;
        margin-bottom: 0.75rem;
        color: var(--primary);
    }

    ul {
        padding-left: 1rem;
        margin: 0;
    }

    li {
        margin-bottom: 0.4rem;
        font-size: 0.95rem;
        color: var(--text-muted);
    }

    strong {
        color: var(--text-dark);
    }
</style>
