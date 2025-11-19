<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.png';

	let { enable = false } = $props();

	type SidebarLink = '/' | '/conways-game-of-life' | '/mandelbrot-set';

	const sidebarItems: Array<{ title: string; items: Array<{ text: string; link: SidebarLink }> }> =
		[
			{
				title: 'Getting Started',
				items: [{ text: 'Introduction', link: '/' }]
			},
			{
				title: 'Demo',
				items: [{ text: "Conway's Game of Life", link: '/conways-game-of-life' }, { text: 'Mandelbrot Set', link: '/mandelbrot-set' }]
			}
		];

	const checkActiveLink = (link: SidebarLink) => {
		const withoutBase = page.url.pathname.split('/creative-coding')[1] || page.url.pathname;
		if (link === '/') {
			return withoutBase === '/';
		}
		return withoutBase.includes(link);
	};
</script>

<aside
	class="block w-full md:w-auto md:min-w-[280px] overflow-y-auto h-[calc(100dvh-72px)] md:h-dvh absolute top-[72px] left-0 duration-300 bg-primary text-primary-text md:relative md:top-0 md:translate-x-0! md:bg-secondary 2xl:pl-[max(32px,calc((100vw-(1536px-64px))/2))] z-2
	{enable ? 'translate-x-0' : '-translate-x-full'}"
>
	<nav class="px-9 py-6">
		<h1 class="flex items-center gap-x-2 pb-6 border-b border-gray-200/10">
			<img src={logo} alt="creative coding logo" class="w-6 h-6" />
			<span>Creative Coding</span>
		</h1>
		<div class="pt-6">
			{#each sidebarItems as section}
				<div class="mb-6 text-sm">
					<h3 class="text-base tracking-wider">
						{section.title}
					</h3>
					<ul class="list-none m-0 p-0">
						{#each section.items as item}
							<li>
								<a
									href={resolve(item.link)}
									class="block no-underline pt-2 text-base transition-all duration-150
									{checkActiveLink(item.link) ? 'text-link-active-text' : 'text-link-text'}"
									>{item.text}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</nav>
</aside>
