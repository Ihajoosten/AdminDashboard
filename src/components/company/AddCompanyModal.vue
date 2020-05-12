<template>
	<div class="modal-card">
		<section class="modal-card-body">
			<h3 class="title has-text-centered has-text-dark">New Company</h3>
			<div class="box">
				<b-field label="Name">
					<b-input v-model="name" type="text" placeholder="Name"></b-input>
				</b-field>

				<b-field label="Branch">
					<b-input v-model="branch" type="text" placeholder="Branch"></b-input>
				</b-field>

				<b-field label="Department">
					<b-input v-model="department" type="text" placeholder="Department"></b-input>
				</b-field>

				<b-field label="Email">
					<b-input v-model="email" type="text" placeholder="Email"></b-input>
				</b-field>

				<b-field label="Phone">
					<b-input v-model="phone" type="text" placeholder="Phone"></b-input>
				</b-field>

				<button class="button is-dark is-fullwidth" v-on:click="handleSubmit()">Create</button>
			</div>
		</section>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		props: ['company'],
		data() {
			return {
				name: "",
				branch: "",
				department: "",
				email: "",
				phone: ""
			};
		},
		methods: {
			...mapActions("company", ["newCompany"]),
			handleSubmit() {
				let company = {
					name: this.name,
					branch: this.branch,
					department: this.department,
					email: this.email,
					phone: this.phone
				};
				this.newCompany(company)
					.then(res => {
						this.$store.dispatch(
							"alert/success",
							{ message: res.message, title: "Success" },
							{ root: true }
						);
						this.$parent.close();
					})
					.catch(err => {
						this.$store.dispatch(
							"alert/error",
							{ message: err.response.data.message, title: "Error" },
							{ root: true }
						);
					});
			}
		}
	};
</script>