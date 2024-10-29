import { toImageData } from './image_data'
import { createImageResizer } from './image_resizer'
import { UNI_PNG_BASE64 } from './testing/constants'

it('takes less than 100ms to resize 400 times', async () => {
	const image = await toImageData(UNI_PNG_BASE64)
	const startTime = new Date().getTime()
	await createImageResizer({ width: image.width * 20, height: image.height * 20 })(image)
	const endTime = new Date().getTime()
	const executionTime = endTime - startTime
	expect(executionTime).toBeLessThan(100)
})

it.skip('takes less than 100ms to resize 400 times (average)', async () => {
	const image = await toImageData(UNI_PNG_BASE64)
	const length = 10
	const startTime = new Date().getTime()

	await Promise.all(
		Array.from({ length }).map(async () => {
			await createImageResizer({ width: image.width * 20, height: image.height * 20 })(image)
		}),
	)
	const endTime = new Date().getTime()
	const executionTime = endTime - startTime
	expect(executionTime / length).toBeLessThan(100)
})
