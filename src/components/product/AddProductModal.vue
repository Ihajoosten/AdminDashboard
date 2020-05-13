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

				<b-field label="Price">
					<b-input v-model="price" type="text" placeholder="Price"></b-input>
				</b-field>

				<b-field label="Brand">
					<b-input v-model="brand" type="text" placeholder="Brand"></b-input>
				</b-field>

				<b-field label="DateReleased">
					<b-input v-model="dateReleased" type="date" placeholder="DateReleased"></b-input>
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
				brand: "",
				dateReleased: ""
			};
		},
		methods: {
			...mapActions("product", ["newProduct"]),
			handleSubmit() {
				let product = {
					name: this.name,
					description: this.description,
					price: this.price,
					brand: this.brand,
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
		}
	};
</script>