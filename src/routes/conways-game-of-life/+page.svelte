<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let interval: null | ReturnType<typeof setInterval> = null;
	// 矩陣大小
	let gridSize: number;
	// 畫布會根據這個陣列狀態繪製
	let arr: boolean[][] = [];
	// 初始活細胞位置
	let alive: number[][] = [];

	// 每個格子的尺寸
	const size = 8;

	// 初始化畫布
	const initCanvas = () => {
		canvas = document.getElementById('canvas') as HTMLCanvasElement;
		canvas.width = Math.floor(canvas.offsetWidth / size) * size;
		canvas.height = Math.floor(canvas.offsetHeight / size) * size;

		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		ctx.fillStyle = '#646cff29';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	};

	const gridCanvas = () => {
		ctx.strokeStyle = '#000000';
		for (let x = 0; x <= canvas.width; x += size) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvas.height);
			ctx.stroke();
		}
		for (let y = 0; y <= canvas.height; y += size) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(canvas.width, y);
			ctx.stroke();
		}
	};

	const updateCanvas = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		gridCanvas();
		alive = ticker();
	};

	// 更新畫布上的 [x,y] 點
	const updatePoint = (x: number, y: number) => {
		ctx.clearRect(x * size + 1, y * size + 1, size - 1, size - 1);
		const color = arr[y][x] ? '#dfdfd6' : '#646cff29';
		ctx.fillStyle = color;
		ctx.fillRect(x * size + 1, y * size + 1, size - 1, size - 1);
	};

	// 確認 3x3 矩陣中的鄰居有幾個活著
	const checkMatrix = (x: number, y: number) => {
		return [
			[x - 1, y - 1],
			[x, y - 1],
			[x + 1, y - 1],
			[x - 1, y],
			[x + 1, y],
			[x - 1, y + 1],
			[x, y + 1],
			[x + 1, y + 1]
		].filter(([matrixX, matrixY]) =>
			alive.some(([aliveX, aliveY]) => aliveX === matrixX && aliveY === matrixY)
		).length;
	};

	const ticker = () => {
		let nextAlive = [];
		// 遍歷整個矩陣，更新活著的狀態
		for (let y = 0; y < arr.length; y += 1) {
			for (let x = 0; x < arr[y].length; x += 1) {
				// 鄰居有幾個活著
				const count = checkMatrix(x, y);
				// 根據當前細胞是否活著決定規則（活著：鄰居有 2 或 3 則活著，死去：鄰居有 3 則復活）
				const checkSample = alive.some(([ax, ay]) => ax === x && ay === y) ? [2, 3] : [3];
				arr[y][x] = checkSample.includes(count);
				// 下一輪活細胞位置
				if (arr[y][x]) nextAlive.push([x, y]);
				// 更新畫布
				updatePoint(x, y);
			}
		}
		return nextAlive;
	};

	const handleClickCanvas = (event: MouseEvent) => {
		// 獲取 x、y 座標
		const x = Math.floor(event.offsetX / size);
		const y = Math.floor(event.offsetY / size);
		// 超出範圍就不管
		if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) return;
		// 如果該點 alive 則移除，否則加入
		if (alive.some(([ax, ay]) => ax === x && ay === y)) {
			alive = alive.filter(([ax, ay]) => !(ax === x && ay === y));
		} else {
			alive.push([x, y]);
		}
		arr[y][x] = !arr[y][x];
		updatePoint(x, y);
	};

	const handleStart = () => {
		if (interval) return;
		interval = setInterval(() => {
			updateCanvas();
		}, 300);
	};

	const handlePause = () => {
		if (!interval) return;
		clearInterval(interval);
		interval = null;
	};

	onMount(() => {
		initCanvas();
		gridSize = canvas.width / size;
		arr = new Array(gridSize).fill([]).map(() => new Array(gridSize).fill(false));
		updateCanvas();
	});

	onDestroy(() => {
		handlePause();
	});
</script>

<h2 class="text-4xl text-primary-text">Conway's Game of Life</h2>

<div class="flex flex-col gap-4 mt-8 md:flex-row">
	<div class="flex flex-row gap-2 w-full md:w-32 md:flex-col">
		<button
			class="bg-secondary min-w-16 p-2 cursor-pointer rounded-lg {interval
				? 'text-link-active-text'
				: 'text-link-text'}"
			aria-label="Start"
			onclick={handleStart}>Start</button
		>
		<button
			class="bg-secondary min-w-16 p-2 cursor-pointer rounded-lg {!interval
				? 'text-link-active-text'
				: 'text-link-text'}"
			aria-label="Pause"
			onclick={handlePause}>Pause</button
		>
	</div>
	<canvas id="canvas" class="w-full max-w-xl aspect-square" onclick={handleClickCanvas}></canvas>
</div>
