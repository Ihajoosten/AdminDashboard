<template>
	<div class="modal-card">
		<section class="modal-card-body">
			<h3 class="title has-text-centered has-text-dark">Update {{ product.Name }}</h3>
			<div class="box">
				<b-field label="Name">
					<b-input v-model="product.Id" type="text" placeholder="Name"></b-input>
				</b-field>

				<b-field label="Description">
					<b-input v-model="product.Description" type="text" placeholder="Description"></b-input>
				</b-field>

				<b-field label="Price">
					<b-input v-model="product.Price" type="text" placeholder="Price"></b-input>
				</b-field>

				<b-field label="Brand">
					<b-select placeholder="Select a company" icon="building" icon-pack="far">
						<option
							v-for="option in companies"
							:value="option.Id === product.CompanyId"
							:key="option.Id"
						>{{ option.Name }}</option>
					</b-select>
				</b-field>

				<b-field label="DateReleased">
					<b-input v-model="product.DateReleased" type="date" placeholder="DateReleased"></b-input>
				</b-field>

				<button class="button is-dark is-fullwidth" v-on:click="handleSubmit()">Create</button>
			</div>
		</section>
	</div>
</template>

<script>
	/* eslint-disable no-unused-vars */
	import { mapActions } from "vuex";
	export default {
		props: ["productObject"],
		data() {
			return {
				product: {
					Id: this.productObject.Id,
					Name: this.productObject.Name,
					Description: this.productObject.Description,
					Price: this.productObject.Price,
					CompanyId: this.productObject.CompanyId,
					DateReleased: this.productObject.DateReleased
				},
				companies: []
			};
		},
		methods: {
			...mapActions("product", ["updateProduct"]),
			handleSubmit() {
				this.newProduct(this.product)
					.then(res => {
						this.$store.dispatch(
							"alert/success",
							{ message: "Updated " + this.product.Name, title: "Success" },
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
		},
		created() {
			this.$store.dispatch("company/getCompanies").then(res => {
				this.companies = res;
			});
		}
	};
</script>