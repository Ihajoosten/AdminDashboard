<template>
	<div id="app">
		<Navbar />

		<Sidebar />

		<router-view></router-view>

		<Footer />
	</div>
</template>

<script>
	import Navbar from "./components/basic/Navbar";
	import Sidebar from "./components/basic/Sidebar";
	import Footer from './components/basic/Footer';

	export default {
		name: "App",
		components: {
			Navbar,
			Sidebar,
			Footer
		}
	};
</script>

<style scoped>

</style>