<script>
	import '../app.css';
</script>

<div class="container mx-auto flex w-full max-w-6xl flex-col gap-4 px-20 py-4 font-serif">
	<h1 class="text-center text-3xl font-semibold">Poke!Critic</h1>
	<slot />
	<footer class="text-center">
		<p>
			Made by <a
				href="https://www.pokeghost.org/"
				target="_blank"
				class="underline hover:no-underline">pokeghost</a
			>. See the
			<a
				href="https://github.com/pokeghosst/pokecritic"
				target="_blank"
				class="underline hover:no-underline">source code</a
			>.
		</p>
		<p>
			Like the project? <a
				href="https://buymeacoffee.com/pokegh0st"
				target="_blank"
				class="underline hover:no-underline">Buy me a coffee</a
			>!
		</p>
	</footer>
</div>
