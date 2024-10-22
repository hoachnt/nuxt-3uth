<script lang="ts" setup>
import { BrowserWalletConnector } from "@vue-dapp/core";
import { VueDappModal, useVueDappModal } from "@vue-dapp/modal";
import "@vue-dapp/modal/dist/style.css";

import { WalletConnectConnector } from "@vue-dapp/walletconnect";
import { CoinbaseWalletConnector } from "@vue-dapp/coinbase";

const { isConnected, disconnect, wallet, addConnectors } = useVueDapp();

function onClickConnectBtn() {
	if (isConnected.value) {
		disconnect();
	} else {
		const { open } = useVueDappModal();
		open();
	}
}

if (process.client) {
	addConnectors([
		new BrowserWalletConnector(),
		new WalletConnectConnector({
			projectId: "3f3c98042b194264687bf59e104c534a",
			chains: [1],
			showQrModal: true,
			qrModalOptions: {
				themeMode: "dark",
				themeVariables: undefined,
				desktopWallets: undefined,
				walletImages: undefined,
				mobileWallets: undefined,
				enableExplorer: true,
				privacyPolicyUrl: undefined,
				termsOfServiceUrl: undefined,
			},
		}),
		new CoinbaseWalletConnector({
			appName: "Vue Dapp",
			jsonRpcUrl: `https://mainnet.infura.io/v3/ff6a249a74e048f1b413cba715f98d07`,
		}),
	]);
}
</script>

<template>
	<div class="navbar bg-base-100">
		<div class="navbar-start">
			<div class="dropdown">
				<ul
					tabindex="0"
					class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
				>
					<li><a>About</a></li>

					<li><a>Team</a></li>
				</ul>
			</div>
			<a class="btn btn-ghost text-xl">Zero Code NFT</a>
		</div>
		<div class="navbar-center hidden lg:flex">
			<ul class="menu menu-horizontal px-1">
				<li><a>About</a></li>

				<li><a>Team</a></li>
			</ul>
		</div>
		<div class="navbar-end">
			<a
				:class="['btn', isConnected ? 'btn-error' : 'glass']"
				@click="onClickConnectBtn"
			>
				<span
					class="loading loading-spinner"
					v-if="wallet.status === 'connecting'"
				></span>
				{{ isConnected ? "Disconnect Wallet" : "Connect Wallet" }}
			</a>
		</div>

		<VueDappModal dark auto-connect />
	</div>
</template>

<style scoped></style>
