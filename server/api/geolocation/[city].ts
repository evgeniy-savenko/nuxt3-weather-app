import axios from 'axios'

export default defineEventHandler(async event => {
	const { city } = event.context.params
	const { searchKey } = useRuntimeConfig()

	const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${searchKey}&types=place`
	try {
		const { data } = await axios.get(uri)
		return data
	} catch (e) {
		if (e) {
			const data = true
			return data
		}
	}
})
