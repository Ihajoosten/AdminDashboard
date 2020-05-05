<template>
	<section class="hero is-primary is-bold">
		<div class="hero-body">
			<div class="container">
				<h1 class="text-center hero-text">Balance overview</h1>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "Balance",
		data() {
			return {};
		}
	};
</script>

<style scoped>
	h1.hero-text {
		background-color: white;
		color: black;
		font-size: 2.5vw;
		font-weight: bold;
		margin: 0 auto;
		padding: 10px;
		width: 40%;
		text-align: center;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		mix-blend-mode: screen;
	}
</style>