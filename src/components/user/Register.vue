<template>
	<div class="modal-card">
		<section class="modal-card-body">
			<h3 class="title has-text-centered has-text-dark">Sign up</h3>
			<div class="box">
				<b-field label="Firstname">
					<b-input v-model="email" type="text" placeholder="Lastname"></b-input>
				</b-field>

				<b-field label="Lastname">
					<b-input v-model="email" type="text" placeholder="Firstname"></b-input>
				</b-field>

				<b-field label="Email">
					<b-input v-model="email" type="email" placeholder="Email"></b-input>
				</b-field>

				<b-field label="Birthday">
					<b-datepicker
						:show-week-number="true"
						placeholder="01-01-2020"
						icon="calendar-today"
						trap-focus
					></b-datepicker>
				</b-field>

				<b-field label="Phonenumber">
					<b-input v-model="phone" type="text" placeholder="06xxxxxxxx"></b-input>
				</b-field>

				<b-field label="Password">
					<b-input
						v-model="password"
						type="password"
						placeholder="Password"
						minlength="6"
						password-reveal
					></b-input>
				</b-field>

				<button class="button is-dark is-large is-fullwidth" v-on:click="register()">Sign up</button>
			</div>
			<div class="has-text-centered">
				Already an account?
				<button class="button is-primary is-small" v-on:click="openLoginModal()">Login</button> here
			</div>
		</section>
	</div>
</template>

<script>
	import LoginModal from "../user/Login";

	export default {
		name: "LoginModal",
		data() {
			return {
				firstname: "",
				lastname: "",
				email: "",
				birthday: "",
				phone: "",
				password: ""
			};
		},
		methods: {
			closeModal() {
				this.$parent.close();
			},
			openLoginModal() {
				this.$parent.close();
				this.$buefy.modal.open({
					parent: this,
					component: LoginModal,
					hasModalCard: true,
					props: {}
				});
			},
			login() {
				this.$parent.close();
				this.$router.push("/dashboard");
			}
		}
	};
</script>