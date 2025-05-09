<script lang="ts">
	export let categoryId: string;
	export let onSpend: (categoryId: string, amount: number) => void;

	function handleSubmit(e: Event) {
		e.preventDefault();
		const input = document.getElementById(categoryId) as HTMLInputElement;
		const amount = Number(input.value);
		if (amount > 0) {
			onSpend(categoryId, amount);
			input.value = '';
		}
	}
</script>

<form on:submit={handleSubmit} class="spending-form">
	<input id={categoryId} type="number" placeholder="Spent amount" />
	<button type="submit">Submit</button>
</form>

<style>
    .spending-form {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        flex-wrap: wrap;
        align-items: center;
    }

    input {
        flex: 1;
        min-width: 150px;
    }

    button {
        white-space: nowrap;
    }
</style>