<script lang="ts">
	import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
	import { onMount } from 'svelte';

	Chart.register(PieController, ArcElement, Tooltip, Legend);

	export let labels: string[] = [];
	export let data: number[] = [];
	let canvas: HTMLCanvasElement;
	let chart: Chart;

	onMount(() => {
		chart = new Chart(canvas, {
			type: 'pie',
			data: {
				labels,
				datasets: [
					{
						label: 'Spending by Category',
						data,
						backgroundColor: [
							'#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
						]
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom',
						labels: {
							font: {
								size: 12
							}
						}
					}
				}
			}
		});
	});

	$: if (chart) {
		chart.data.labels = labels;
		chart.data.datasets[0].data = data;
		chart.update();
	}

</script>

<div class="chart-wrapper">
<canvas bind:this={canvas}></canvas>
</div>

<style>
    .chart-wrapper {
        max-width: 400px;
        margin: 0 auto;
    }

    canvas {
        width: 100% !important;
        height: auto !important;
    }
</style>
