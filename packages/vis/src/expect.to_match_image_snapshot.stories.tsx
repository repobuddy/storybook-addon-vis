import type { Meta, StoryObj } from '@storybook/react'
import dedent from 'dedent'
import { page } from './@vitest/browser/context'
import { UNI_PNG_URL } from './testing/constants'

export default {
	title: 'expect.toMatchImageSnapshot',
} satisfies Meta

export const Success: StoryObj = {
	render() {
		return <img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
	},
	async play() {
		await expect(page.imageSnapshot()).toMatchImageSnapshot()
	},
}

export const Failed: StoryObj = {
	render() {
		return (
			<>
				<img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
				<img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
			</>
		)
	},
	async play() {
		await expect(() => expect(page.imageSnapshot()).toMatchImageSnapshot()).rejects.toThrowError(
			dedent`Expected image to match but was differ by 5105 pixels.

			Expected:   '../__snapshots__/expect.to_match_image_snapshot.stories.tsx/failed-1.png'
			Actual:     '../__snapshots__/__results__/expect.to_match_image_snapshot.stories.tsx/failed-1.png'
			Difference: '../__snapshots__/__diff_output__/expect.to_match_image_snapshot.stories.tsx/failed-1.png'`,
		)
	},
}

export const Element: StoryObj = {
	render() {
		return <img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
	},
	async play({ canvas }) {
		const image = await canvas.getByRole('img')
		await expect(page.imageSnapshot({ element: image })).toMatchImageSnapshot()
	},
}

export const DifferentSize: StoryObj = {
	render() {
		// return <img style={{ width: 128, height: 128 }} src={UNI_PNG_URL} />
		return <img style={{ width: 256, height: 256 }} src={UNI_PNG_URL} />
	},
	async play({ canvas }) {
		const image = await canvas.getByRole('img')
		await expect(() => expect(page.imageSnapshot({ element: image })).toMatchImageSnapshot()).rejects.toThrowError(
			dedent`Expected image to match but was differ by 51931 pixels.

			Expected:   '../__snapshots__/expect.to_match_image_snapshot.stories.tsx/different-size-1.png'
			Actual:     '../__snapshots__/__results__/expect.to_match_image_snapshot.stories.tsx/different-size-1.png'
			Difference: '../__snapshots__/__diff_output__/expect.to_match_image_snapshot.stories.tsx/different-size-1.png'`,
		)
	},
}

export const MeetFailureThreshold: StoryObj = {
	render: () => <div data-testid="subject">unit test</div>,
	// render: () => <div data-testid="subject">unit text</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		await expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot({
			failureThreshold: 70,
		})
	},
}

export const FailureThreshold: StoryObj = {
	render: () => <div data-testid="subject">unit test</div>,
	// render: () => <div data-testid="subject">unit text</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		await expect(() =>
			expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot({
				failureThreshold: 10,
			}),
		).rejects.toThrowError(
			dedent`Expected image to match within 10 pixels but was differ by 60 pixels.

			Expected:   '../__snapshots__/expect.to_match_image_snapshot.stories.tsx/failure-threshold-1.png'
			Actual:     '../__snapshots__/__results__/expect.to_match_image_snapshot.stories.tsx/failure-threshold-1.png'
			Difference: '../__snapshots__/__diff_output__/expect.to_match_image_snapshot.stories.tsx/failure-threshold-1.png'`,
		)
	},
}

export const FailureThresholdByPercentage: StoryObj = {
	// render: () => <div data-testid="subject">unit test</div>,
	render: () => <div data-testid="subject">unit text</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		await expect(() =>
			expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot({
				failureThreshold: 0.1,
				failureThresholdType: 'percent',
			}),
		).rejects.toThrowError(
			dedent`Expected image to match within 0.1% but was differ by 0.2777777777777778%.

			Expected:   '../__snapshots__/expect.to_match_image_snapshot.stories.tsx/failure-threshold-by-percentage-1.png'
			Actual:     '../__snapshots__/__results__/expect.to_match_image_snapshot.stories.tsx/failure-threshold-by-percentage-1.png'
			Difference: '../__snapshots__/__diff_output__/expect.to_match_image_snapshot.stories.tsx/failure-threshold-by-percentage-1.png'`,
		)
	},
}

export const MeetFailureThresholdByPercentage: StoryObj = {
	render: () => <div data-testid="subject">unit test</div>,
	// render: () => <div data-testid="subject">unit text</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		await expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot({
			failureThreshold: 0.3,
			failureThresholdType: 'percent',
		})
	},
}

export const ExactFailureThresholdByPercentage: StoryObj = {
	// render: () => <div data-testid="subject">unit test</div>,
	render: () => <div data-testid="subject">unit text</div>,
	async play({ canvas }) {
		const subject = canvas.getByTestId('subject')
		await expect(() =>
			expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot({
				failureThresholdType: 'percent',
			}),
		).rejects.toThrowError(
			dedent`Expected image to match but was differ by 0.2777777777777778%.

			Expected:   '../__snapshots__/expect.to_match_image_snapshot.stories.tsx/exact-failure-threshold-by-percentage-1.png'
			Actual:     '../__snapshots__/__results__/expect.to_match_image_snapshot.stories.tsx/exact-failure-threshold-by-percentage-1.png'
			Difference: '../__snapshots__/__diff_output__/expect.to_match_image_snapshot.stories.tsx/exact-failure-threshold-by-percentage-1.png'`,
		)
	},
}
