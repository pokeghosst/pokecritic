<script lang="ts">
	import { Persona } from '$lib/enums/Persona';

	import Button from '$lib/components/Button.svelte';

	const personas = [
		{
			name: 'Stroke my ego',
			value: Persona.KIND
		},
		{
			name: 'Balanced',
			value: Persona.BALANCED
		},
		{
			name: 'Strict',
			value: Persona.STRICT
		},
		{
			name: 'Roast me',
			value: Persona.ROAST
		}
	];

	let critique: Promise<any>;
	let text = '';
	let persona = Persona.BALANCED;

	async function askCritique() {
		const res = await fetch('/api/critique', {
			method: 'POST',
			body: JSON.stringify({ text, persona })
		});

		const data = await res.json();

		if (res.status !== 200) throw new Error(data.message);

		return data;
	}

	function handleFormSubmit(event: SubmitEvent) {
		critique = askCritique();
	}
</script>

{#if critique}
	{#await critique}
		<p>Writing your review...</p>
	{:then result}
		<div>
			<p class="whitespace-pre-line bg-white p-12 text-lg outline outline-1 outline-stone-200">
				{result.kwargs.content}
			</p>
		</div>
	{:catch error}
		{error}
	{/await}
{/if}

<form on:submit|preventDefault={handleFormSubmit} class="flex flex-col gap-4">
	<textarea
		class="h-[70vh] w-full rounded border border-stone-300 p-6 text-lg"
		placeholder="Paste your poem, story, or other text here... (100-20000 characters)"
		bind:value={text}
		minlength="100"
		maxlength="20000"
	></textarea>
	<div class="flex flex-col gap-2">
		<label for="persona" class="font-sans">Critic persona:</label>
		<select
			bind:value={persona}
			id="persona"
			class="rounded bg-white px-4 py-2 font-sans outline outline-1 outline-stone-200"
		>
			{#each personas as option}
				<option value={option.value}>{option.name}</option>
			{/each}
		</select>
	</div>
	<Button type="submit" disabled={text.length < 100}>Give me critique!</Button>
</form>
