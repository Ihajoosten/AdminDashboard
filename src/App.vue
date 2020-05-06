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
	import LoginModal from "./components/user/Login";
	import { mapState, mapActions } from "vuex";
	import { router } from "./routes";

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
			}),
			openLoginModal() {
				this.$buefy.modal.open({
					parent: this,
					component: LoginModal,
					hasModalCard: true,
					props: {}
				});
			}
		},
		watch: {
			// eslint-disable-next-line no-unused-vars
			$route(to, from) {
				this.clearAlert();
			}
		},
		created() {
			router.beforeEach((to, from, next) => {
				if (!localStorage.getItem("user")) {
					return this.openLoginModal();
				}
				next();
			});
		}
	};
</script>

<style scoped>
</style>