import axios from 'axios'

export default defineEventHandler(async event => {
	const { city } = event.context.params
	// const { searchKey } = useRuntimeConfig()
	const searchKey =
		'pk.eyJ1Ijoid2F5cmV6IiwiYSI6ImNsamhlc2E0aTA1NnAza21sY21vZWVwcW0ifQ.Q5Sw7BRzijNI-yum8I5Kew'

	const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${searchKey}&types=place`
	try {
		const { data } = await axios.get(uri)
		return data
	} catch (e) {
		console.log(e)
		if (e) {
			const data = true
			return data
		}
	}
})
