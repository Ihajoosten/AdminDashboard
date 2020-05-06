<template>
	<div id="app">
		<Navbar />
		<div class="container">
			<div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
			<router-view></router-view>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Navbar from "./components/basic/Navbar";
	import Footer from "./components/basic/Footer";
	import { mapState, mapActions } from "vuex";

	export default {
		name: "App",
		components: {
			Navbar,
			Footer
		},
		computed: {
			...mapState({
				alert: state => state.alert
			})
		},
		methods: {
			...mapActions({
				clearAlert: "alert/clear"
			})
		},
		watch: {
			// eslint-disable-next-line no-unused-vars
			$route(to, from) {
				// clear alert on location change
				this.clearAlert();
			}
		}
	};
</script>

<style scoped>
</style>