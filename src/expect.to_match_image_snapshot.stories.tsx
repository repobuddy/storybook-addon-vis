import type { Meta, StoryObj } from '@storybook/react'
import { page } from './@vitest/browser/context'

export default {
	title: 'expect.toMatchImageSnapshot',
} satisfies Meta

const UNI_PNG_BASE64 =
	'data:image/png;base64,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'

export const Success: StoryObj = {
	render() {
		return <img style={{ width: 128, height: 128 }} src={UNI_PNG_BASE64} />
	},
	async play() {
		await expect(page.imageSnapshot()).toMatchImageSnapshot()
	},
}

export const Failed: StoryObj = {
	render() {
		return (
			<>
				<img style={{ width: 128, height: 128 }} src={UNI_PNG_BASE64} />
				<img style={{ width: 128, height: 128 }} src={UNI_PNG_BASE64} />
			</>
		)
	},
	async play() {
		await expect(() => expect(page.imageSnapshot()).toMatchImageSnapshot()).rejects.toThrowError(
			`Image snapshot does not match the baseline. See the diff image at '../__snapshots__/__diff_output__/expect.to_match_image_snapshot.stories.tsx/Failed-1.png'`,
		)
	},
}

export const Element: StoryObj = {
	render() {
		return <img style={{ width: 128, height: 128 }} src={UNI_PNG_BASE64} />
	},
	async play({ canvas }) {
		const image = await canvas.getByRole('img')
		await expect(page.imageSnapshot({ element: image })).toMatchImageSnapshot()
	},
}

export const DifferentSize: StoryObj = {
	render() {
		return <img style={{ width: 256, height: 256 }} src={UNI_PNG_BASE64} />
	},
	async play({ canvas }) {
		const image = await canvas.getByRole('img')
		await expect(() => expect(page.imageSnapshot({ element: image })).toMatchImageSnapshot()).rejects.toThrowError(
			`Image snapshot does not match the baseline. See the diff image at '../__snapshots__/__diff_output__/expect.to_match_image_snapshot.stories.tsx/Different-Size-1.png'`,
		)
	},
}
