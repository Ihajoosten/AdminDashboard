<template>
	<div class="modal-card">
		<section class="modal-card-body">
			<h3 class="title has-text-centered has-text-dark">New Product</h3>
			<div class="box">
				<b-field label="Name">
					<b-input v-model="name" type="text" placeholder="Name"></b-input>
				</b-field>

				<b-field label="Description">
					<b-input v-model="description" type="text" placeholder="Description"></b-input>
				</b-field>

				<b-field label="Date released">
					<b-datepicker
						v-model="dateReleased"
						:show-week-number="true"
						placeholder="Click to select..."
						icon="calendar-today"
						trap-focus
					></b-datepicker>
				</b-field>

				<b-field label="Brand">
					<b-select v-model="companyId" placeholder="Select a company" icon="building" icon-pack="far">
						<option
							v-for="option in companies"
							:value="option.Id"
							:key="option.Id"
						>{{ option.Id + ": " + option.Name }}</option>
					</b-select>
				</b-field>

				<b-field label="Price">
					<b-numberinput step="0.5" v-model="price" placeholder="Price"></b-numberinput>
				</b-field>

				<button class="button is-dark is-fullwidth" v-on:click="handleSubmit()">Create</button>
			</div>
		</section>
	</div>
</template>

<script>
	import { mapActions } from "vuex";

	export default {
		data() {
			return {
				name: "",
				description: "",
				price: "",
				companyId: "",
				dateReleased: "",
				companies: []
			};
		},
		methods: {
			...mapActions("product", ["newProduct"]),
			handleSubmit() {
				let product = {
					name: this.name,
					description: this.description,
					price: this.price,
					companyId: this.companyId,
					dateReleased: this.dateReleased
				};
				this.newProduct(product)
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
		},
		created() {
			this.$store.dispatch("company/getCompanies").then(res => {
				this.companies = res;
			});
		}
	};
</script>