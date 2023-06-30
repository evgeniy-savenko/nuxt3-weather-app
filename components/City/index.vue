<template>
	<div>
		<Suspense>
			<CityAsyncInfo />
			<template #fallback><CitySkeletonDetailCard /></template>
		</Suspense>
	</div>
</template>

<script setup></script>

<style scoped></style>
