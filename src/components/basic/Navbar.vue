<template>
	<b-navbar id="navbar" class="bd-navbar navbar has-shadow is-spaced">
		<template slot="brand">
			<b-navbar-item class="navbar-item" tag="router-link" :to="{ path: '/' }">
				<img
					src="../../assets/logo.png"
					alt="Admin Cloud open source administration system"
					width="40"
					height="50"
				/>
				<h2>Admin Cloud</h2>
			</b-navbar-item>

			<!-- <div id="navbarBurger" class="navbar-burger burger" data-target="navMenuDocumentation">
					<span></span>
					<span></span>
					<span></span>
			</div>-->
		</template>

		<template slot="start">
			<b-navbar-item
				class="navbar-item bd-navbar-item-videos"
				tag="router-link"
				:to="{ path: '/balance' }"
			>
				<span class="icon has-text-success">
					<i class="fas fa-play-circle"></i>
				</span>

				<span>Balance</span>
			</b-navbar-item>

			<div class="navbar-item has-dropdown is-hoverable">
				<b-navbar-item class="navbar-link" tag="router-link" :to="{ path: '/companies' }">Companies</b-navbar-item>

				<div id="moreDropdown" class="navbar-dropdown">
					<a
						class="navbar-item is-hidden-widescreen"
						href="https://github.com/jgthms/bulma"
						target="_blank"
					>
						<span>
							<span class="icon" style="color: #333;">
								<i class="fab fa-lg fa-github-alt"></i>
							</span>
							<strong>GitHub</strong>
							<br />The official repository
						</span>
					</a>

					<hr class="navbar-divider is-hidden-widescreen" />

					<a class="navbar-item is-hidden-widescreen" href="https://bulma.io/backers">
						<span>
							<span class="icon has-text-patreon">
								<i class="fab fa-patreon"></i>
							</span>
							<strong>Patreon and GitHub Backers</strong>
							<br />Everyone who is supporting Bulma
						</span>
					</a>

					<hr class="navbar-divider is-hidden-widescreen" />

					<a class="navbar-item" href="https://bulma.io/blog">
						<span>
							<span class="icon has-text-orange">
								<i class="fas fa-rss"></i>
							</span>
							<strong>Blog</strong>
							<br />Stay updated with new features
						</span>
					</a>

					<hr class="navbar-divider" />

					<a class="navbar-item" href="https://bulma.io/made-with-bulma">
						<span>
							<span class="icon has-text-primary">
								<i class="fas fa-certificate"></i>
							</span>
							<strong>Made with Bulma</strong>
							<br />The official community badge
						</span>
					</a>

					<hr class="navbar-divider" />

					<a class="navbar-item" href="https://bulma.io/alternative-to-bootstrap">
						<span>
							<span class="icon has-text-bootstrap">
								<i class="fas fa-exchange-alt"></i>
							</span>
							<strong>Coming from Bootstrap</strong>
							<br />See how Bulma is an alternative to Bootstrap
						</span>
					</a>
				</div>
			</div>

			<div class="navbar-item has-dropdown is-hoverable">
				<b-navbar-item class="navbar-link" tag="router-link" :to="{ path: '/invoices' }">Invoices</b-navbar-item>

				<div id="moreDropdown" class="navbar-dropdown">
					<a
						class="navbar-item is-hidden-widescreen"
						href="https://github.com/jgthms/bulma"
						target="_blank"
					>
						<span>
							<span class="icon" style="color: #333;">
								<i class="fab fa-lg fa-github-alt"></i>
							</span>
							<strong>GitHub</strong>
							<br />The official repository
						</span>
					</a>

					<hr class="navbar-divider is-hidden-widescreen" />

					<a class="navbar-item is-hidden-widescreen" href="https://bulma.io/backers">
						<span>
							<span class="icon has-text-patreon">
								<i class="fab fa-patreon"></i>
							</span>
							<strong>Patreon and GitHub Backers</strong>
							<br />Everyone who is supporting Bulma
						</span>
					</a>

					<hr class="navbar-divider is-hidden-widescreen" />

					<a class="navbar-item" href="https://bulma.io/blog">
						<span>
							<span class="icon has-text-orange">
								<i class="fas fa-rss"></i>
							</span>
							<strong>Blog</strong>
							<br />Stay updated with new features
						</span>
					</a>

					<hr class="navbar-divider" />

					<a class="navbar-item" href="https://bulma.io/made-with-bulma">
						<span>
							<span class="icon has-text-primary">
								<i class="fas fa-certificate"></i>
							</span>
							<strong>Made with Bulma</strong>
							<br />The official community badge
						</span>
					</a>

					<hr class="navbar-divider" />

					<a class="navbar-item" href="https://bulma.io/alternative-to-bootstrap">
						<span>
							<span class="icon has-text-bootstrap">
								<i class="fas fa-exchange-alt"></i>
							</span>
							<strong>Coming from Bootstrap</strong>
							<br />See how Bulma is an alternative to Bootstrap
						</span>
					</a>
				</div>
			</div>

			<div class="navbar-item has-dropdown is-hoverable">
				<b-navbar-item class="navbar-link" tag="router-link" :to="{ path: '/products' }">Products</b-navbar-item>

				<div id="moreDropdown" class="navbar-dropdown">
					<a
						class="navbar-item is-hidden-widescreen"
						href="https://github.com/jgthms/bulma"
						target="_blank"
					>
						<span>
							<span class="icon" style="color: #333;">
								<i class="fab fa-lg fa-github-alt"></i>
							</span>
							<strong>GitHub</strong>
							<br />The official repository
						</span>
					</a>

					<hr class="navbar-divider is-hidden-widescreen" />

					<a class="navbar-item is-hidden-widescreen" href="https://bulma.io/backers">
						<span>
							<span class="icon has-text-patreon">
								<i class="fab fa-patreon"></i>
							</span>
							<strong>Patreon and GitHub Backers</strong>
							<br />Everyone who is supporting Bulma
						</span>
					</a>

					<hr class="navbar-divider is-hidden-widescreen" />

					<a class="navbar-item" href="https://bulma.io/blog">
						<span>
							<span class="icon has-text-orange">
								<i class="fas fa-rss"></i>
							</span>
							<strong>Blog</strong>
							<br />Stay updated with new features
						</span>
					</a>

					<hr class="navbar-divider" />

					<a class="navbar-item" href="https://bulma.io/made-with-bulma">
						<span>
							<span class="icon has-text-primary">
								<i class="fas fa-certificate"></i>
							</span>
							<strong>Made with Bulma</strong>
							<br />The official community badge
						</span>
					</a>

					<hr class="navbar-divider" />

					<a class="navbar-item" href="https://bulma.io/alternative-to-bootstrap">
						<span>
							<span class="icon has-text-bootstrap">
								<i class="fas fa-exchange-alt"></i>
							</span>
							<strong>Coming from Bootstrap</strong>
							<br />See how Bulma is an alternative to Bootstrap
						</span>
					</a>
				</div>
			</div>

			<div class="navbar-item has-dropdown is-hoverable">
				<b-navbar-item
					class="navbar-link"
					tag="router-link"
					:to="{ path: '/transactions' }"
				>Transactions</b-navbar-item>

				<div id="moreDropdown" class="navbar-dropdown">
					<a
						class="navbar-item is-hidden-widescreen"
						href="https://github.com/jgthms/bulma"
						target="_blank"
					>
						<span>
							<span class="icon" style="color: #333;">
								<i class="fab fa-lg fa-github-alt"></i>
							</span>
							<strong>GitHub</strong>
							<br />The official repository
						</span>
					</a>

					<hr class="navbar-divider is-hidden-widescreen" />

					<a class="navbar-item is-hidden-widescreen" href="https://bulma.io/backers">
						<span>
							<span class="icon has-text-patreon">
								<i class="fab fa-patreon"></i>
							</span>
							<strong>Patreon and GitHub Backers</strong>
							<br />Everyone who is supporting Bulma
						</span>
					</a>

					<hr class="navbar-divider is-hidden-widescreen" />

					<a class="navbar-item" href="https://bulma.io/blog">
						<span>
							<span class="icon has-text-orange">
								<i class="fas fa-rss"></i>
							</span>
							<strong>Blog</strong>
							<br />Stay updated with new features
						</span>
					</a>

					<hr class="navbar-divider" />

					<a class="navbar-item" href="https://bulma.io/made-with-bulma">
						<span>
							<span class="icon has-text-primary">
								<i class="fas fa-certificate"></i>
							</span>
							<strong>Made with Bulma</strong>
							<br />The official community badge
						</span>
					</a>

					<hr class="navbar-divider" />

					<a class="navbar-item" href="https://bulma.io/alternative-to-bootstrap">
						<span>
							<span class="icon has-text-bootstrap">
								<i class="fas fa-exchange-alt"></i>
							</span>
							<strong>Coming from Bootstrap</strong>
							<br />See how Bulma is an alternative to Bootstrap
						</span>
					</a>
				</div>
			</div>
		</template>

		<template slot="end">
			<div class="navbar-item">
				<div class="field is-grouped is-grouped-multiline">
					<div class="buttons">
						<b-navbar-item class="button is-primary" tag="router-link" :to="{ path: '/register' }">
							<strong>Sign up</strong>
						</b-navbar-item>
						<b-navbar-item class="button is-light" tag="router-link" :to="{ path: '/login' }">Log in</b-navbar-item>
					</div>
				</div>
			</div>
		</template>
	</b-navbar>
</template>

<script>
	export default {};
</script>

<style scoped>
</style>