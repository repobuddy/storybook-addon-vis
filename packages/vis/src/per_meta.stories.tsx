import type { Meta, StoryObj } from '@storybook/react'

export default {
	title: 'per meta',
	render: () => <>unit test</>,
	tags: ['snapshot'],
} satisfies Meta

export const TakeSnapshot: StoryObj = {}

export const SkipSnapshot: StoryObj = {
	tags: ['!snapshot'],
}
