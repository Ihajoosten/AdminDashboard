<template>
	<section class="hero is-primary">
		<div class="hero-body">
			<div class="container">
				<h1 class="text-center hero-text">Transaction overview</h1>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "Transactions",
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