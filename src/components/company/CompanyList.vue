<template>
	<div>
		<section class="hero is-primary">
			<div class="hero-body">
				<div class="container">
					<h1 class="text-center hero-text">Company overview</h1>
				</div>
			</div>
		</section>

		<section>
			<section>
				<b-field grouped group-multiline>
					<button class="button is-light control is-flex" v-on:click="openCreateModal()">
						<strong>+ New</strong>
					</button>
					<b-select class="control is-flex" v-model="perPage" :disabled="!isPaginated">
						<option value="5">5 per page</option>
						<option value="10">10 per page</option>
						<option value="15">15 per page</option>
						<option value="20">20 per page</option>
					</b-select>
				</b-field>
			</section>
			<b-table
				:data="companies"
				ref="table"
				paginated
				:per-page="perPage"
				:hoverable="true"
				:mobile-cards="true"
				detailed
				detail-key="Id"
				@details-open="(row, index) => $buefy.toast.open(`Expanded ${row.Name}`)"
				:show-detail-icon="showDetailIcon"
				custom-row-key="Id"
				aria-next-label="Next page"
				aria-previous-label="Previous page"
				aria-page-label="Page"
				aria-current-label="Current page"
			>
				<b-input
					v-if="!props.column.numeric"
					slot="searchable"
					slot-scope="props"
					v-model="props.filters[props.column.field]"
					placeholder="Search..."
					icon="magnify"
					size="is-small"
				/>
				<template slot-scope="props">
					<b-table-column field="Id" label="ID" width="40" numeric>{{ props.row.Id }}</b-table-column>

					<b-table-column field="Name" label="Name" sortable searchable>
						<template v-if="showDetailIcon">{{ props.row.Name }}</template>
						<template v-else>
							<a @click="toggle(props.row)">{{ props.row.Name }}</a>
						</template>
					</b-table-column>

					<b-table-column field="Branch" label="Branch" sortable searchable>{{ props.row.Branch }}</b-table-column>
					<b-table-column
						field="Department"
						label="Department"
						sortable
						searchable
					>{{ props.row.Department }}</b-table-column>

					<b-table-column field="Email" label="Email" sortable searchable>
						<span class="tag is-success">{{ props.row.Email}}</span>
					</b-table-column>

					<b-table-column label="Phone" searchable>
						<span>{{ props.row.Phone }}</span>
					</b-table-column>

					<b-table-column>
						<div class="buttons">
							<b-button
								type="is-warning"
								size="is-small"
								icon-left="pen"
								v-on:click="openEditModal(props.row)"
							></b-button>
							<b-button
								type="is-danger"
								size="is-small"
								icon-left="delete"
								v-on:click="handleDelete(props.row)"
							></b-button>
						</div>
					</b-table-column>
				</template>

				<template slot="detail" slot-scope="props">
					<article class="media">
						<figure class="media-left">
							<p class="image is-64x64">
								<img src="/static/img/placeholder-128x128.png" />
							</p>
						</figure>
						<div class="media-content">
							<div class="content">
								<p>
									<strong>{{ props.row.Name }}</strong>
									<small>31m</small>
									<br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Proin ornare magna eros, eu pellentesque tortor vestibulum ut.
									Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
								</p>
							</div>
						</div>
					</article>
				</template>
			</b-table>
		</section>
	</div>
</template>

<script>
	import AddCompanyModal from "./AddCompanyModal";
	import UpdateCompanyModal from "./UpdateCompanyModal";

	import { mapState, mapActions } from "vuex";
	export default {
		name: "Companies",
		data() {
			return {
				perPage: 5,
				showDetailIcon: true,
				isPaginated: true
			};
		},
		computed: {
			...mapState({
				companies: state => state.company.companies
			})
		},
		methods: {
			...mapActions("company", ["getCompanies", "deleteCompany"]),
			toggle(row) {
				this.$refs.table.toggleDetails(row);
			},
			openCreateModal() {
				this.$buefy.modal.open({
					parent: this,
					component: AddCompanyModal,
					hasModalCard: true,
					props: {}
				});
			},
			openEditModal(row) {
				this.$buefy.modal.open({
					parent: this,
					component: UpdateCompanyModal,
					hasModalCard: true,
					props: {
						companyObject: row
					}
				});
			},
			handleDelete(obj) {
				this.deleteCompany(obj);
			}
		},
		created() {
			this.getCompanies();
		}
	};
</script>

<style scoped>
	section.hero {
		margin-bottom: 15px;
	}

	h1.hero-text {
		background-color: white;
		color: black;
		font-size: 2.5vw;
		font-weight: bold;
		margin: 0 auto;
		padding: 10px;
		width: 40%;
		text-align: center;
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		mix-blend-mode: screen;
	}
</style>