// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/google-fonts',
		'@nuxtjs/tailwindcss',
		'nuxt-icons',
		'nuxt-icon',
	],
	runtimeConfig: {
		searchKey: process.env.SEARCH_API_KEY,
		weatherKey: process.env.WEATHER_API_KEY,
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		head: {
			title: 'Nuxt 3 weather app',
			meta: [{ name: 'description', content: 'Nuxt 3 weather app' }],
		},
	},
})
