import { expect } from '@storybook/test'
import type { BaseAnnotations, StoryContext } from 'storybook/internal/types'
import { setAutoSnapshotOptions } from 'vitest-plugin-vis'
import { getCurrentTest } from 'vitest/suite'
import { toMatchImageSnapshot } from '../client/expect/to_match_image_snapshot.ts'

expect.extend({ toMatchImageSnapshot })

export const visAnnotations = {
	beforeEach(ctx: StoryContext) {
		const tags = ctx.tags
		const enable = !tags ? false : tags.lastIndexOf('!snapshot') < tags.lastIndexOf('snapshot')
		const test = getCurrentTest()
		setAutoSnapshotOptions(test, { enable, ...ctx.parameters?.snapshot })
	},
} satisfies BaseAnnotations