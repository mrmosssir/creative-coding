import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	},

	paths: {
		// 只有在 GitHub Actions 執行 build 時，才設定 base path
		base: process.env.GITHUB_ACTIONS === 'true' ? '/creative-coding' : ''
	}
};

export default config;
