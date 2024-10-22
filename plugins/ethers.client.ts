import { ethers } from "ethers";

export default defineNuxtPlugin(() => {
	const connectMetaMask = async (savedSignerAddress?: string | null) => {
		if (!window.ethereum) {
			const isMobile = /iPhone|iPad|iPod|Android/i.test(
				navigator.userAgent
			);

			if (isMobile) {
				window.location.href = "https://metamask.app.link/dapp";
			}
			alert("Please install the MetaMask extension to use this DApp.");
			return;
		}

		try {
			const provider = new ethers.BrowserProvider(window.ethereum);

			let address: string | undefined | null = savedSignerAddress;

			if (!address) {
				// Запрашиваем доступ к аккаунтам
				const accounts = await provider.send("eth_requestAccounts", []);
				const signer = await provider.getSigner(accounts[0]);

				// Получаем адрес кошелька
				address = await signer.getAddress();
			}

			const balance = await provider.getBalance(address);

			// Сохраняем адрес в sessionStorage
			sessionStorage.setItem("walletAddress", address);

			// Возвращаем signer и provider для дальнейшего использования
			return { address, balance };
		} catch (error) {
			console.error("User denied account access", error);
		}
	};

	const getStoredWalletAddress = () => {
		return sessionStorage.getItem("walletAddress");
	};

	return {
		provide: {
			connectMetaMask,
			getStoredWalletAddress,
		},
	};
});
