import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	vite: {
		plugins: [nodePolyfills()], // only for @vue-dapp/coinbase
	},

	modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vue-dapp/nuxt"],
});
