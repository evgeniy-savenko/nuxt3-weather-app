<script setup>
	import { onBeforeMount } from 'vue'

	const savedCities = ref([])
	const getCities = async () => {
		if (localStorage.getItem('savedCities')) {
			savedCities.value = JSON.parse(localStorage.getItem('savedCities'))
		}

		const requests = []
		savedCities.value.forEach(city => {
			requests.push(
				useFetch(
					`/api/weather/${city.coordinate.lat}&${city.coordinate.lgn}&homepage`
				)
			)
		})

		const weatherData = await Promise.all(requests)

		await new Promise(res => setTimeout(res, 2000))

		weatherData.forEach((value, index) => {
			savedCities.value[index].weather = value.data.value
		})
	}

	function onClickToCityView(city) {
		useRouter().push(
			`/details/${city.country}/${city.city}?id=${city.id}&lat=${city.coordinate.lat}&lgn=${city.coordinate.lgn}`
		)
	}

	onBeforeMount(async () => {
		await getCities()
	})
</script>

<template>
	<div v-for="city of savedCities" :key="city.id">
		<CitySavedListCard :city="city" @click="onClickToCityView(city)" />
	</div>
	<p v-if="savedCities.length === 0">
		No location added. To start tracking a location, search in the field above.
	</p>
</template>
