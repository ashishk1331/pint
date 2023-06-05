import { useStore } from './useStore.js'

export const freeze = () => {

	const { gradient, shadow, frameGap, radius, imageURI, imageSize } = useStore(state => state)

	return {
		gradient, shadow, frameGap, radius, imageURI, imageSize
	}
}