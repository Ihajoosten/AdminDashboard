<template>
	<div id="app">
		<div class="navbar">
			<Navbar />
		</div>

		<div class="sidebar">
			<Sidebar />
		</div>

		<div class="view">
			<router-view />
		</div>

		<div class="footer">
			<Footer />
		</div>
	</div>
</template>

<script>
	import Navbar from "./components/basic/Navbar";
	import Sidebar from "./components/basic/Sidebar";
	import Footer from "./components/basic/Footer";

	export default {
		name: "App",
		components: {
			Navbar,
			Sidebar,
			Footer
		}
	};
</script>

<style>
	/* #app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	} */
</style>
