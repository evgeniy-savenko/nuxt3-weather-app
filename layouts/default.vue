<script setup>
	import { ref } from 'vue'
	import { uid } from 'uid'

	const modalActive = ref(false)
	const savedCities = ref([])

	const onClickToggleModal = () => {
		modalActive.value = !modalActive.value
	}

	function onClickAddToLocal() {
		if (localStorage.getItem('savedCities')) {
			savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
		}

		const locationObj = {
			id: uid(),
			country: useRoute().params.country,
			city: useRoute().params.city,
			coordinate: {
				lat: useRoute().query.lat,
				lgn: useRoute().query.lgn,
			},
		}
		savedCities.value.push(locationObj)
		localStorage.setItem('savedCities', JSON.stringify(savedCities.value))
		let query = Object.assign({}, useRoute().query)
		delete query.preview
		query.id = locationObj.id
		useRouter().replace({ query })
	}
</script>

<template>
	<div class="flex flex-col min-h-screen bg-weather-primary">
		<header class="sticky top-0 bg-weather-primary shadow-lg">
			<nav
				class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
			>
				<NuxtLink to="/">
					<div class="flex items-center gap-3 flex-1">
						<Icon size="38px" name="mdi:weather-sunny" />
						<p class="text-2xl">The Local Weather</p>
					</div>
				</NuxtLink>

				<div class="flex gap-3 flex-1 justify-end">
					<Icon
						@click="onClickToggleModal()"
						class="hover:text-weather-secondary duration-100 cursor-pointer"
						size="38px"
						name="mdi:information-slab-circle"
					/>
					<Icon
						v-if="useRoute().query.preview"
						class="hover:text-weather-secondary duration-100 cursor-pointer"
						size="38px"
						name="mdi:plus-circle"
						@click="onClickAddToLocal()"
					/>
				</div>
			</nav>
		</header>
		<slot />

		<Modal :modalActive="modalActive" @close-modal="onClickToggleModal()">
			<ModalInfo />
		</Modal>
	</div>
</template>
