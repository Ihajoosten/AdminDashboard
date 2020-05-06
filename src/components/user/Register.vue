<template>
	<div class="modal-card">
		<section class="modal-card-body">
			<h3 class="title has-text-centered has-text-dark">Sign up</h3>
			<div class="box">
				<b-field label="Firstname">
					<b-input v-model="user.firstname" type="text" placeholder="Firstname"></b-input>
				</b-field>

				<b-field label="Lastname">
					<b-input v-model="user.lastname" type="text" placeholder="Lastname"></b-input>
				</b-field>

				<b-field label="Email">
					<b-input v-model="user.email" type="email" placeholder="Email"></b-input>
				</b-field>

				<b-field label="Birthday">
					<b-datepicker
						:show-week-number="true"
						placeholder="01-01-2020"
						icon="calendar-today"
						trap-focus
						v-model="user.birthday"
					></b-datepicker>
				</b-field>

				<b-field label="Phonenumber">
					<b-input v-model="user.phone" type="text" placeholder="06xxxxxxxx"></b-input>
				</b-field>

				<b-field label="Password">
					<b-input
						v-model="user.password"
						type="password"
						placeholder="Password"
						minlength="6"
						password-reveal
					></b-input>
				</b-field>

				<button class="button is-dark is-large is-fullwidth" v-on:click="handleSubmit()">Sign up</button>
			</div>
			<div class="has-text-centered">
				Already an account?
				<button
					class="button is-primary is-small"
					v-on:click="openLoginModal()"
				>Login</button> here
			</div>
		</section>
	</div>
</template>

<script>
	import LoginModal from "../user/Login";
	import { mapActions } from "vuex";

	export default {
		name: "RegisterModal",
		data() {
			return {
				user: {
					firstname: "",
					lastname: "",
					email: "",
					birthday: "",
					phone: "",
					password: ""
				}
			};
		},
		computed: {},
		methods: {
			...mapActions("userModule", ["register"]),
			openLoginModal() {
				this.$parent.close();
				this.$buefy.modal.open({
					parent: this,
					component: LoginModal,
					hasModalCard: true,
					props: {}
				});
			},
			handleSubmit() {
				this.register({ user: this.user })
					.then(res => {
						this.$store.commit("userModule/registerSuccess", res);
						this.$store.dispatch("alert/success", "Signed up successfully!", {
							root: true
						});
						this.openLoginModal();
					})
					.catch(err => {
						this.$store.commit("userModule/registerFailure", err);
						this.$store.dispatch("alert/error", err.response.data.message, {
							root: true
						});
					});
			}
		}
	};
</script>