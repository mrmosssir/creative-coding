<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	let sidebarOpen = $state(false);

	// Handle keyboard events
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && sidebarOpen) {
			sidebarOpen = false;
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<svelte:window onkeydown={handleKeydown} />

<div class="min-h-screen grid grid-cols-1 grid-rows-[60px_1fr] md:flex md:justify-stretch">
	<Sidebar enable={sidebarOpen} />

	<div class="flex flex-col flex-1 h-dvh">
		<!-- Header -->
		<header
			class="sticky top-0 z-1 bg-nav-bg h-[72px] border-b border-black 2xl:pr-[max(32px,calc((100vw-(1536px-64px))/2))]"
		>
			<div class="flex items-center justify-between h-[72px] px-6">
				<button
					class="md:hidden order-2 bg-transparent border-none cursor-pointer p-2 rounded-md transition-colors duration-150 text-main-text"
					onclick={() => (sidebarOpen = !sidebarOpen)}
					aria-label="Toggle sidebar"
				>
					<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
						<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
					</svg>
				</button>
			</div>
		</header>
		<!-- Main Content -->
		<main
			class="flex-1 overflow-y-auto bg-main-bg 2xl:pr-[max(32px,calc((100vw-(1536px-64px))/2))]"
		>
			<div class="py-8 px-6 md:py-12 md:px-24">
				{@render children?.()}
			</div>
		</main>
	</div>
</div>
