<template>
	<b-navbar id="navbar">
		<template slot="brand">
			<b-navbar-item  tag="router-link" :to="{ name: 'Home', path: '/' }">
				<img src="../../assets/img/admincloud-logo.jpg" alt="Admin Cloud - Always Up & Running" />
			</b-navbar-item> 
		</template>

		<template slot="start">
			<b-navbar-item tag="router-link" :to="{ name: 'Balance', path: '/balance' }">
				<span>Balance</span>
			</b-navbar-item>

			<b-navbar-item tag="router-link" :to="{ name: 'Companies',  path: '/companies' }">
				<span>Companies</span>
			</b-navbar-item>

			<b-navbar-item tag="router-link" :to="{ name: 'Invoices',  path: '/invoices' }">
				<span>Invoices</span>
			</b-navbar-item>

			<b-navbar-item tag="router-link" :to="{ name: 'Products', path: '/products' }">
				<span>Products</span>
			</b-navbar-item>

			<b-navbar-item tag="router-link" :to="{ name: 'Transactions', path: '/transactions' }">
				<span>Transactions</span>
			</b-navbar-item>
		</template>

		<template v-if="!isLoggedIn" slot="end">
			<b-navbar-item tag="div">
				<div class="buttons">
					<p class="button is-primary is-small" v-on:click="openRegisterModal()">Sign up</p>
					<p class="button is-light is-small" v-on:click="openLoginModal()">Log in</p>
				</div>
			</b-navbar-item>
		</template>

		<template v-else slot="end">
			<b-navbar-item tag="div">
				<div class="buttons">
					<p class="button is-primary is-small">Account</p>
					<p class="button is-danger is-small" v-on:click="signOut()">Log out</p>
				</div>
			</b-navbar-item>
		</template>
	</b-navbar>
</template>

<script>
	import LoginModal from "../user/Login";
	import RegisterModal from "../user/Register";
	import { mapState, mapActions } from "vuex";

	export default {
		data() {
			return {};
		},
		computed: {
			...mapState({
				isLoggedIn: state => state.user.participant
			})
		},
		methods: {
			...mapActions("user", ["logout"]),
			signOut() {
				this.logout();
			},
			openLoginModal() {
				this.$buefy.modal.open({
					parent: this,
					component: LoginModal,
					hasModalCard: true,
					props: {}
				});
			},
			openRegisterModal() {
				this.$buefy.modal.open({
					parent: this,
					component: RegisterModal,
					hasModalCard: true,
					props: {}
				});
			}
		}
	};
</script>

<style scoped>
	nav#navbar {
		margin: 0 0 15px 0;
		padding: 0 75px;
		border-bottom: 7.5px double #7957d5;
		border-top: 5px solid #7957d5;
	}

	b-navbar-item {
		text-decoration: none;
	}

	.navbar-item img {
		max-height: 4.75rem;
	}

	.navbar-burger {
		height: 0!important;
	}
</style>