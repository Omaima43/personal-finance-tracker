<script lang="ts">
	export let balance: number;
	export let newBalance: number;
	export let onUpdate: () => void;
	export let bindNewBalance: (val: number) => void;

	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		bindNewBalance(Number(input.value));}
</script>

<div class="card">
	<h2>Your Balance</h2>
	<p class="current-balance"><strong>Current:</strong> {balance}$</p>

	<input
		type="number"
		placeholder="Update balance"
		bind:value={newBalance}
		on:input={handleInput}
	/>

	<button on:click={onUpdate}>Update Balance</button>
</div>

<style>
    .card {
        background-color: var(--bg-card);
        padding: 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        margin-bottom: 2rem;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    .current-balance {
        margin-bottom: 1rem;
        color: var(--text-muted);
    }
</style>
