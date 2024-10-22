<template>
	<div>
		<Navbar />

		<div class="card bg-primary text-primary-content">
			<div class="card-body">
				<h2 class="card-title">Status: {{ wallet.status }}</h2>

				<p>Connected: {{ isConnected }}</p>

				<p v-if="wallet.error">error: {{ wallet.error }}</p>

				<div v-if="isConnected">
					<div>Chain ID: {{ wallet.chainId }}</div>

					<div>Address: {{ wallet.address }}</div>
				</div>
			</div>
		</div>

		<MetaMaskAuth />

		<NuxtRouteAnnouncer />
		<NuxtWelcome />
	</div>
</template>

<script lang="ts" setup>
const { isConnected, wallet } = useVueDapp();
</script>
