<template>
	<div class="flex flex-col flex-1">
		<!-- Overview -->
		<div class="flex flex-col py-12 items-center">
			<CitySkeleton class="max-w-[300px] w-full mb-2" />
			<CitySkeleton class="max-w-[300px] w-full mb-12" />
			<CitySkeleton class="max-w-[300px] h-[100px] w-full mb-12" />
			<CitySkeleton class="max-w-[300px] w-full mb-8" />
			<CitySkeleton class="max-w-[300px] h-[75px] w-full" />
		</div>
		<!-- Hourly -->
		<div class="flex flex-col py-12 px-8 items-center">
			<CitySkeleton class="max-w-screen-md h-[100px] w-full mb-12" />
		</div>
		<!-- Weekly -->
		<div class="flex flex-col py-12 px-8 items-center">
			<CitySkeleton class="max-w-screen-md h-[100px] w-full mb-12" />
		</div>
	</div>
</template>
