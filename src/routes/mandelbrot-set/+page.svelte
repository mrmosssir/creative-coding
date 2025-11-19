<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	// Viewport state
	let zoom = 200;
	let panX = 0;
	let panY = 0;
	let maxIterations = 100;

	// Canvas dimensions
	let width = 0;
	let height = 0;

	const initCanvas = () => {
		canvas = document.getElementById('mandelbrot-canvas') as HTMLCanvasElement;
		// Set actual canvas size to match display size for 1:1 pixel mapping
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;
		width = canvas.width;
		height = canvas.height;

		// Center at -0.75 + 0i
		panX = width / 2 / zoom + 0.75;
		panY = height / 2 / zoom;

		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		drawMandelbrot();
	};

	const drawMandelbrot = () => {
		if (!ctx) return;

		const imageData = ctx.createImageData(width, height);
		const data = imageData.data;

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				// Map pixel to complex plane
				let cx = x / zoom - panX;
				let cy = y / zoom - panY;

				let zx = 0;
				let zy = 0;
				let iter = 0;

				// Optimization: Check for main cardioid and period-2 bulb
				const q = (cx - 0.25) ** 2 + cy ** 2;
				if (q * (q + (cx - 0.25)) < 0.25 * cy ** 2) {
					iter = maxIterations;
				} else if ((cx + 1) ** 2 + cy ** 2 < 0.0625) {
					iter = maxIterations;
				} else {
					while (zx * zx + zy * zy < 4 && iter < maxIterations) {
						let temp = zx * zx - zy * zy + cx;
						zy = 2 * zx * zy + cy;
						zx = temp;
						iter++;
					}
				}

				// Color pixel
				const pixelIndex = (y * width + x) * 4;
				if (iter === maxIterations) {
					// Inside the set: Black
					data[pixelIndex] = 0;
					data[pixelIndex + 1] = 0;
					data[pixelIndex + 2] = 0;
					data[pixelIndex + 3] = 255;
				} else {
					// Outside the set: Color based on iterations
					// Using a smooth coloring or just simple mapping
					const color = iter / maxIterations;
					// Simple blue-ish gradient
					data[pixelIndex] = Math.floor(color * 100); // R
					data[pixelIndex + 1] = Math.floor(color * 100); // G
					data[pixelIndex + 2] = Math.floor(color * 255 + 100); // B
					data[pixelIndex + 3] = 255; // Alpha
				}
			}
		}
		ctx.putImageData(imageData, 0, 0);
	};

	const handleCanvasClick = (event: MouseEvent) => {
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		// Calculate the complex coordinate of the clicked point
		const cx = x / zoom - panX;
		const cy = y / zoom - panY;

		// Zoom in
		zoom *= 2;

		// Recenter view on clicked point
		// New center should be (width/2, height/2) corresponding to (cx, cy)
		// cx = (width/2 / zoom) - newPanX
		// newPanX = (width/2 / zoom) - cx
		panX = width / 2 / zoom - cx;
		panY = height / 2 / zoom - cy;

		drawMandelbrot();
	};

	const handleContextMenu = (event: MouseEvent) => {
		event.preventDefault();
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const cx = x / zoom - panX;
		const cy = y / zoom - panY;

		// Zoom out
		zoom /= 2;

		panX = width / 2 / zoom - cx;
		panY = height / 2 / zoom - cy;

		drawMandelbrot();
	};

	const handleReset = () => {
		zoom = 200;
		panX = width / 2 / zoom + 0.75;
		panY = height / 2 / zoom;
		drawMandelbrot();
	};

	onMount(() => {
		// Wait for layout to settle
		setTimeout(initCanvas, 100);

		window.addEventListener('resize', () => {
			// Debounce resize
			initCanvas();
		});
	});
</script>

<h2 class="text-4xl text-primary-text pb-12 border-b border-gray-200/10 mb-8">Mandelbrot Set</h2>

<!-- Description -->
<div class="pb-12 border-b border-gray-200/10 mb-8">
	<h3 class="text-2xl text-primary-text mb-4">曼德博集合</h3>
	<p class="text-primary-text font-light mb-4">
		曼德博集合（Mandelbrot Set）是複數平面上的一個點集。對於集合中的每一個點 <i>c</i>，從 <i>z</i> =
		0 開始，不斷重複 <i>z</i><sub>n+1</sub> = <i>z</i><sub>n</sub><sup>2</sup> + <i>c</i>
		的運算，序列 |<i>z</i><sub>n</sub>| 不會趨向於無窮大。
	</p>
	<p class="text-primary-text font-light">
		它是碎形幾何中最著名的圖形之一，展現了無限的細節和自相似性。當你放大邊界時，會發現越來越多複雜且美麗的圖案。
	</p>
</div>

<!-- Rules/Math -->
<div class="pb-12 border-b border-gray-200/10 mb-8">
	<h3 class="text-xl text-primary-text mb-4">數學原理</h3>
	<p class="text-primary-text font-light mb-4">曼德博集合的定義基於複數數列：</p>
	<div class="bg-secondary/30 p-4 rounded-lg mb-4 text-center">
		<code class="text-xl text-link-active-text"
			>z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c</code
		>
	</div>
	<p class="text-primary-text font-light">
		其中 <i>z</i> 和 <i>c</i> 都是複數。如果對於給定的 <i>c</i>，數列 |<i>z</i><sub>n</sub>|
		始終不超過 2，則該點 <i>c</i>
		屬於曼德博集合（顯示為黑色）。如果數列發散（趨向無窮大），則該點不屬於集合，通常根據發散的速度（迭代次數）來上色。
	</p>
</div>

<!-- Controls and Canvas -->
<div class="pb-12 border-b border-gray-200/10 mb-8">
	<h4 class="text-lg text-primary-text mb-2">操作說明</h4>
	<p class="text-primary-text text-sm mb-4">
		<strong>左鍵點擊</strong>畫布可放大並以點擊處為中心。<strong>右鍵點擊</strong>可縮小。
	</p>
</div>

<div class="flex flex-col gap-4 mt-6 md:flex-row">
	<div class="flex flex-row gap-2 w-full md:w-32 md:flex-col">
		<button
			class="bg-secondary min-w-16 p-2 cursor-pointer rounded-lg text-link-text hover:text-link-active-text transition-colors"
			aria-label="Reset"
			onclick={handleReset}>Reset</button
		>
		<div class="text-primary-text text-sm mt-4">
			<p>Zoom: {Math.round(zoom)}x</p>
			<p>Max Iter: {maxIterations}</p>
		</div>
	</div>
	<canvas
		id="mandelbrot-canvas"
		class="w-full max-w-xl aspect-square bg-black cursor-crosshair rounded-lg shadow-lg"
		onclick={handleCanvasClick}
		oncontextmenu={handleContextMenu}
	></canvas>
</div>

<style scoped>
	strong {
		color: var(--color-link-active-text);
		font-weight: bold;
		margin: 0 4px;
	}
</style>
