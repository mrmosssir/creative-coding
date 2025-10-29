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

<h2 class="text-4xl text-primary-text pb-12 border-b border-gray-200/10 mb-8">
	Conway's Game of Life
</h2>

<!-- 遊戲說明 -->
<div class="pb-12 border-b border-gray-200/10 mb-8">
	<h3 class="text-2xl text-primary-text mb-4">康威生命遊戲</h3>
	<p class="text-primary-text font-light mb-4">
		康威生命遊戲（Conway's Game of Life），通常簡稱為生命遊戲 （Life），是 1970
		年由英國數學家約翰·何頓·康威（John Horton Conway）設計的一種「細胞自動機」（Cellular
		Automaton）。
	</p>
	<p class="text-primary-text font-light">
		它被稱為「零玩家遊戲」（Zero-player
		game），這意味著它的演化完全由其初始狀態決定，不需要任何後續的玩家輸入。
	</p>
</div>

<!-- 遊戲規則 -->
<div class="pb-12 border-b border-gray-200/10 mb-8">
	<h3 class="text-xl text-primary-text mb-4">遊戲規則</h3>
	<p class="text-primary-text font-light mb-4">
		生命遊戲在一個二維的方格網格上進行，每個方格（細胞）有兩種狀態：<strong>存活</strong> (Alive) 或<strong
			>死亡</strong
		> (Dead)。
	</p>
	<p class="text-primary-text font-light mb-4">
		一個細胞在下一個世代的狀態，取決於其周圍<strong>8 個鄰居</strong
		>（上、下、左、右、以及四個對角線）當前的存活狀態。
	</p>
	<ul class="flex flex-col gap-y-4 text-primary-text mb-8">
		<li>
			<h4 class="font-bold mb-2">1. 人口稀少 (Underpopulation)</h4>
			<p class="font-light indent-4">
				如果一個<strong>存活</strong>細胞的鄰居少於<strong>2</strong>
				個，它會因為「孤單」而在下一個世代<strong>死亡</strong>。
			</p>
		</li>
		<li>
			<h4 class="font-bold mb-2">2. 穩定存活 (Survival)</h4>
			<p class="font-light indent-4">
				如果一個<strong>存活</strong>細胞有<strong>2</strong>或<strong>3</strong>
				個存活的鄰居，它會<strong>繼續存活</strong>到下一個世代。
			</p>
		</li>
		<li>
			<h4 class="font-bold mb-2">3. 人口過剩 (Overpopulation)</h4>
			<p class="font-light indent-4">
				如果一個<strong>存活</strong>細胞的鄰居超過 <strong>3</strong>
				個，它會因為「擁擠」而在下一個世代<strong>死亡</strong>。
			</p>
		</li>
		<li>
			<h4 class="font-bold mb-2">4. 繁殖 (Reproduction)</h4>
			<p class="font-light indent-4">
				如果一個<strong>死亡</strong>細胞<strong>剛好</strong>有<strong>3</strong>
				個存活的鄰居，它會因為「繁殖」而在下一個世代變為<strong>存活</strong>狀態。
			</p>
		</li>
	</ul>
	<p class="text-primary-text font-light">
		生命遊戲的魅力在於，僅僅透過這四條簡單的規則，就能從一個簡單的初始圖案演化出極其複雜、無法預測的動態系統。
	</p>
</div>

<!-- 行為特性 -->
<div class="space-y-8 border-b border-gray-200/10 pb-12 mb-8">
	<div class="border-l-4 border-link-text pl-4">
		<h5 class="text-lg text-primary-text mb-2">湧現行為 (Emergent Behavior)</h5>
		<p class="text-primary-text text-sm">
			系統會自發地產生複雜的結構和行為，這是「湧現」的經典範例。
		</p>
	</div>
	<div class="border-l-4 border-link-text pl-4">
		<h5 class="text-lg text-primary-text mb-2">圖靈完備 (Turing Completeness)</h5>
		<p class="text-primary-text text-sm">
			生命遊戲在理論上被證明是「圖靈完備」的，這意味著它（在足夠大的網格和時間下）可以模擬任何電腦演算法，甚至可以建造一個在生命遊戲中運作的生命遊戲。
		</p>
	</div>
	<div class="border-l-4 border-link-text pl-4">
		<h5 class="text-lg text-primary-text mb-2">多樣的模式 (Common Patterns)</h5>
		<p class="text-primary-text text-sm mb-2">
			玩家和研究者發現了許多有趣的模式，並為其命名，主要分為三類：
		</p>
		<ul class="text-primary-text text-sm space-y-1 ml-4">
			<li><strong>靜物 (Still Lifes):</strong>保持不變的圖案（例如 "Block" 方塊）。</li>
			<li>
				<strong>振盪器 (Oscillators):</strong>在幾個狀態之間循環的圖案（例如 "Blinker" 閃爍燈）。
			</li>
			<li>
				<strong>太空船 (Spaceships):</strong>會在網格上移動的圖案（最有名的是 "Glider" 滑翔翼）。
			</li>
		</ul>
	</div>
</div>

<!-- 操作說明和遊戲區域 -->
<div class="pb-12 border-b border-gray-200/10 mb-8">
	<h4 class="text-lg text-primary-text mb-2">操作說明</h4>
	<p class="text-primary-text text-sm mb-4">
		點擊方格來設定初始的存活細胞，然後按下 Start 開始模擬。你可以隨時暫停來調整細胞狀態。
	</p>
</div>

<div class="flex flex-col gap-4 mt-6 md:flex-row">
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

<style scoped>
	strong {
		color: var(--color-link-active-text);
		font-weight: bold;
		margin: 0 4px;
	}
</style>
