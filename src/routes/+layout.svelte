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

<div class="min-h-screen grid grid-cols-1 grid-rows-[60px_1fr] md:grid-cols-[280px_1fr]">
	<Sidebar enable={sidebarOpen} />
	<!-- Desktop Sidebar -->
	<!-- <aside class="hidden lg:block overflow-y-auto h-dvh sticky top-[60px] bg-sidebar-bg">
		<nav class="p-6 pt-6">
			{#each sidebarItems as section}
				<div class="mb-8">
					<h3 class="text-xs font-semibold mb-3 px-3 uppercase tracking-wider">
						{section.title}
					</h3>
					<ul class="list-none m-0 p-0">
						{#each section.items as item}
							<li>
								<a
									href={item.link}
									class="sidebar-link block no-underline py-2 px-3 rounded-md text-sm leading-relaxed transition-all duration-150"
									>{item.text}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</aside> -->

	<!-- Mobile Sidebar -->
	<!-- <aside
		class="lg:hidden fixed top-[60px] left-0 w-[280px] h-[calc(100vh-60px)] z-200 transform transition-transform duration-300 ease-in-out {sidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<nav class="p-6 pt-6 overflow-y-auto h-full">
			{#each sidebarItems as section}
				<div class="mb-8">
					<h3 class="text-xs font-semibold mb-3 px-3 uppercase tracking-wider">
						{section.title}
					</h3>
					<ul class="list-none m-0 p-0">
						{#each section.items as item}
							<li>
								<a
									href={item.link}
									class="sidebar-link block no-underline py-2 px-3 rounded-md text-sm leading-relaxed transition-all duration-150"
									>{item.text}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</aside> -->

	<div class="flex flex-col h-dvh">
		<!-- Header -->
		<header class="sticky top-0 z-1 bg-nav-bg h-[72px] border-b border-black">
			<div class="flex items-center justify-between h-[72px] px-6">
				<button
					class="md:hidden order-2 bg-transparent border-none cursor-pointer p-2 rounded-md transition-colors duration-150"
					onclick={() => (sidebarOpen = !sidebarOpen)}
					aria-label="Toggle sidebar"
				>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
						<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
					</svg>
				</button>
			</div>
		</header>
		<!-- Main Content -->
		<main class="flex-1 overflow-x-auto bg-main-bg">
			<div class="max-w-[1200px] mx-auto p-8 md:p-6">
				{@render children?.()}
			</div>
		</main>
	</div>
</div>
