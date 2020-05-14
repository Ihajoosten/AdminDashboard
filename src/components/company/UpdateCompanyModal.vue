<template>
	<div class="modal-card">
		<section class="modal-card-body">
			<h3 class="title has-text-centered has-text-dark">Update {{ companyObject.Name }}</h3>
			<div class="box">
				<b-field label="ID">
					<b-input v-model="company.Id" type="text" disabled></b-input>
				</b-field>

				<b-field label="Name">
					<b-input v-model="company.Name" type="text" placeholder="Name"></b-input>
				</b-field>

				<b-field label="Branch">
					<b-input v-model="company.Branch" type="text" placeholder="Branch"></b-input>
				</b-field>

				<b-field label="Department">
					<b-input v-model="company.Department" type="text" placeholder="Department"></b-input>
				</b-field>

				<b-field label="Email">
					<b-input v-model="company.Email" type="text" placeholder="Email"></b-input>
				</b-field>

				<b-field label="Phone">
					<b-input v-model="company.Phone" type="text" placeholder="Phone"></b-input>
				</b-field>

				<button class="button is-dark is-fullwidth" v-on:click="handleSubmit()">Update</button>
			</div>
		</section>
	</div>
</template>

<script>
	/* eslint-disable no-unused-vars */
	import { mapActions } from "vuex";
	export default {
		props: ["companyObject"],
		data() {
			return {
				company: {
					Id: this.companyObject.Id,
					Name: this.companyObject.Name,
					Branch: this.companyObject.Branch,
					Department: this.companyObject.Department,
					Email: this.companyObject.Email,
					Phone: this.companyObject.Phone
				}
			};
		},
		methods: {
			...mapActions("company", ["updateCompany"]),
			handleSubmit() {
				this.updateCompany(this.company)
					.then(res => {
						this.$store.dispatch(
							"alert/success",
							{ message: "Updated " + this.company.Name, title: "Success" },
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