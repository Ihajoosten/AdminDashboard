<template>
	<b-navbar class="bd-navbar navbar has-shadow is-spaced">
		<template slot="brand">
			<b-navbar-item
				class="brand-name"
				style="font-size: 2.5vw;"
				tag="router-link"
				:to="{ name: 'Home', path: '/' }"
			>
				<img src="../../assets/img/admincloud-logo.jpg" alt="Admin Cloud - Always Up & Running" />
			</b-navbar-item>
		</template>

		<template slot="start">
			<b-navbar-item
				class="navbar-item bd-navbar-item-videos"
				tag="router-link"
				:to="{ name: 'Balance', path: '/balance' }"
			>
				<span>Balance</span>
			</b-navbar-item>

			<b-navbar-item
				class="navbar-item bd-navbar-item-videos"
				tag="router-link"
				:to="{ name: 'Companies',  path: '/companies' }"
			>
				<span>Companies</span>
			</b-navbar-item>

			<b-navbar-item
				class="navbar-item bd-navbar-item-videos"
				tag="router-link"
				:to="{ name: 'Invoices',  path: '/invoices' }"
			>
				<span>Invoices</span>
			</b-navbar-item>

			<b-navbar-item
				class="navbar-item bd-navbar-item-videos"
				tag="router-link"
				:to="{ name: 'Products', path: '/products' }"
			>
				<span>Products</span>
			</b-navbar-item>

			<b-navbar-item
				class="navbar-item bd-navbar-item-videos"
				tag="router-link"
				:to="{ name: 'Transactions', path: '/transactions' }"
			>
				<span>Transactions</span>
			</b-navbar-item>
		</template>

		<template slot="end">
			<div class="navbar-item">
				<div class="field is-grouped is-grouped-multiline">
					<div class="buttons">
						<b-navbar-item class="button is-primary" v-on:click="openRegisterModal()">
							<strong>Sign up</strong>
						</b-navbar-item>
						<b-navbar-item class="button is-light" v-on:click="openLoginModal()">Log in</b-navbar-item>
					</div>
				</div>
			</div>
		</template>
	</b-navbar>
</template>

<script>
	import LoginModal from "../user/Login";
	import RegisterModal from "../user/Register";

	export default {
		data() {
			return {};
		},
		methods: {
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
	b-navbar-item {
		text-decoration: none;
	}

	.navbar-item img {
		max-height: 4.75rem;
	}
</style>