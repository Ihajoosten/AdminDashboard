<template>
	<div id="app">
		<Navbar class="is-fixed-top" />
		<div class="container" style="margin-top: 84px">
			<router-view></router-view>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Navbar from "./components/basic/Navbar";
	import Footer from "./components/basic/Footer";

	export default {
		name: "App",
		components: {
			Navbar,
			Footer
		}
	};
</script>

<style scoped>
</style>