<script setup>
	const searchQuery = ref('')
	const querryTimeout = ref(null)
	const searchResult = ref(null)

	const getSearchResult = () => {
		clearTimeout(querryTimeout.value)
		querryTimeout.value = setTimeout(async () => {
			if (searchQuery.value !== '') {
				const { data: geoData } = await useFetch(
					`/api/geolocation/${searchQuery.value}`,
					{
						lazy: true,
					}
				)
				if (typeof geoData.value === 'boolean') {
					searchResult.value = false
				} else {
					searchResult.value = geoData.value.features
				}

				return
			}
			searchResult.value = null
		}, 1000)
	}
</script>

<template>
	<main class="container text-white" id="app">
		<div class="pt-4 mb-8 relative">
			<input
				@input="getSearchResult"
				v-model="searchQuery"
				type="text"
				placeholder="Search "
				class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus: outline-none focus:shadow-[0px_1px_0_0_#004E71]"
			/>
			<p class="py-2 cursor-pointer" v-show="searchResult === false">
				Get response error. Try again later.
			</p>
			<p
				class="py-2 cursor-pointer"
				v-if="searchResult && searchResult.length === 0"
			>
				No result match your query.
			</p>
			<ul
				v-else-if="searchResult && searchResult.length > 1"
				class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
			>
				<li
					v-for="(res, index) of searchResult"
					:key="index"
					class="py-2 cursor-pointer"
				>
					<NuxtLink
						:to="`/details/${res.place_name
							.split(',')[1]
							.replaceAll(' ', '')}/${res.place_name.split(',')[0]}?lat=${
							res.geometry.coordinates[1]
						}&lgn=${res.geometry.coordinates[0]}&preview=true`"
					>
						{{ res.place_name }}
					</NuxtLink>
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-4">
			<Suspense>
				<CitySavedList />
				<template #fallback><CitySkeletonCard /></template>
			</Suspense>
		</div>
	</main>
</template>

<style>
	#app {
		font-family: 'Roboto';
	}
	.page-enter-active,
	.page-leave-active {
		transition: all 0.4s;
	}
	.page-enter-from,
	.page-leave-to {
		opacity: 0;
		filter: blur(1rem);
	}
</style>
