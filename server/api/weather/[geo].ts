import axios from 'axios'

export default defineEventHandler(async event => {
	const { geo } = event.context.params
	const { weatherKey } = useRuntimeConfig()
	let uri

	if (geo.split('&')[2] === 'homepage') {
		uri = `https://api.openweathermap.org/data/2.5/weather?lat=${
			geo.split('&')[0]
		}&lon=${geo.split('&')[1]}&exclude={part}&appid=${weatherKey}&units=metric`

		try {
			const { data } = await axios.get(uri)
			return data
		} catch (e) {
			if (e) {
				const data = true
				return data
			}
		}
	} else {
		uri = `https://api.openweathermap.org/data/3.0/onecall?lat=${
			geo.split('&')[0]
		}&lon=${geo.split('&')[1]}&exclude={part}&appid=${weatherKey}&units=metric`

		try {
			const { data } = await axios.get(uri)
			// cal current date & time
			const localOffset = new Date().getTimezoneOffset() * 60000
			const utc = data.current.dt * 1000 + localOffset
			data.currentTime = utc + 1000 * data.timezone_offset
			// cal hourly weather offset
			data.hourly.forEach(hour => {
				const utc = hour.dt * 1000 + localOffset
				hour.currentTime = utc + 1000 * data.timezone_offset
			})

			await new Promise(res => setTimeout(res, 1000))

			return data
		} catch (e) {
			if (e) {
				const data = true
				return data
			}
		}
	}
})
