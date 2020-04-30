<template>
	<div id="app">
		<Navbar />
		<div class="app-view">
			<router-view v-bind:key="$route.path"></router-view>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Navbar from "./components/basic/Navbar";
	// import Sidebar from "./components/basic/Sidebar";
	import Footer from "./components/basic/Footer";

	export default {
		name: "App",
		components: {
			Navbar,
			// Sidebar,
			Footer
		}
	};
</script>
