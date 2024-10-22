<template>
	<div>
		<button class="btn" @click="connect()">Подключить MetaMask</button>
		<div v-if="walletAddress">
			<p>Connected Wallet Address: {{ walletAddress }}</p>
			<p>Wallet Balance: {{ walletBalance }} ETH</p>
		</div>
	</div>
</template>

<script setup lang="ts">
const { $connectMetaMask, $getStoredWalletAddress } = useNuxtApp();
const walletAddress = ref<string | null>(null);
const walletBalance = ref<string | null>(null);

const connect = async (walletID?: string | null) => {
	const result = await $connectMetaMask(walletID);

	// Check if result is not undefined
	if (result) {
		const { address, balance } = result;

		if (address) {
			console.log("Connected to MetaMask:", address);
			walletAddress.value = address;
			walletBalance.value = balance.toString(); // Convert bigint to string if necessary
		}
	}
};

onMounted(() => {
	connect($getStoredWalletAddress());
});
</script>

<style>
/* Добавьте ваши стили здесь */
</style>
