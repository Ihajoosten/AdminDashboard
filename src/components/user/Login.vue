<template>
	<div class="modal-card">
		<section class="modal-card-body">
			<h3 class="title has-text-centered has-text-dark">Login</h3>
			<div class="box">
				<b-field label="Email">
					<b-input v-model="email" type="email" placeholder="Email"></b-input>
				</b-field>

				<b-field label="Password">
					<b-input v-model="password" type="password" placeholder="Password" password-reveal></b-input>
				</b-field>
				<b-field>
					<a
						class="password-remind-link has-text-dark is-pulled-right"
						v-on:click="openResetPasswordModal()"
					>I forgot my password</a>
				</b-field>
				<button class="button is-dark is-large is-fullwidth" v-on:click="handleSubmit()">Login</button>
			</div>
			<div class="has-text-centered">
				Not an account yet?
				<button
					class="button is-primary is-small"
					v-on:click="openRegisterModal()"
				>Sign up</button> here
			</div>
		</section>
	</div>
</template>

<script>
	import RegisterModal from "../user/Register";
	import ResetpasswordModal from "../user/ResetPassword";
	import { mapState, mapActions } from "vuex";

	export default {
		name: "LoginModal",
		data() {
			return {
				email: "",
				password: ""
			};
		},
		computed: {
			...mapState('userModule', ['status'])
		},
		methods: {
			...mapActions("userModule", ["login", "logout"]),
			closeModal() {
				this.$parent.close();
			},
			openRegisterModal() {
				this.$parent.close();
				this.$buefy.modal.open({
					parent: this,
					component: RegisterModal,
					hasModalCard: true,
					props: {}
				});
			},
			openResetPasswordModal() {
				this.$parent.close();
				this.$buefy.modal.open({
					parent: this,
					component: ResetpasswordModal,
					hasModalCard: true,
					props: {}
				});
			},
			handleSubmit() {
				this.login({ email: this.email, password: this.password }).then(() => {
					console.log(this.$store.state.userModule.status)
					console.log(this.$store.state.userModule.user)
					if (this.$store.state.userModule.status.loggedIn) {
						this.closeModal();
					}
				});
			},
			created() {
				// reset login status
				this.logout();
			}
		}
	};
</script>

<style scoped>
</style>