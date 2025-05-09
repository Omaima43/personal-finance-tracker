<script lang="ts">
	export let name: string;
	export let limit: number;
	export let onNameChange: (val: string) => void;
	export let onLimitChange: (val: number) => void;
	export let onAdd: () => void;

	function handleLimitInput(event: Event) {
		const input = event.target as HTMLInputElement;
		onLimitChange(Number(input.value));
	}

	function handleNameInput(e: Event) {
		const input = e.target as HTMLInputElement;
		onNameChange(input.value);
	}
</script>

<div class="add-category-form">
	<h2>Add New Category</h2>
	<input
		type="text"
		placeholder="Category name"
		bind:value={name}
		on:input={handleNameInput}
	/>
	<input
		type="number"
		placeholder="Limit"
		bind:value={limit}
		on:input={handleLimitInput}
	/>
	<button on:click={onAdd}>Add Category</button>
</div>

<style>
    .add-category-form {
        background-color: var(--bg-card);
        padding: 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        margin-bottom: 2rem;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
        text-align: center;    }

    input {
        margin-bottom: 1rem;
    }

</style>
