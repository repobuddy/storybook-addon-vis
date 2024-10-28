import { type StoryContext, setProjectAnnotations } from '@storybook/react'
import { page } from 'storybook-addon-vis'
import {
	configureSnapshotBeforeAll,
	configureSnapshotBeforeEach,
	shouldTakeSnapshot,
	toMatchImageSnapshot,
} from 'storybook-addon-vis/vitest-setup'
import { afterEach, beforeAll, beforeEach, expect } from 'vitest'
import * as projectAnnotations from './preview'

expect.extend({ toMatchImageSnapshot })

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([projectAnnotations])

beforeAll((suite) => {
	project.beforeAll()
	configureSnapshotBeforeAll(suite)
})

beforeEach((ctx) => {
	configureSnapshotBeforeEach(ctx)
})

afterEach<{ story?: StoryContext }>(async (ctx) => {
	if (!shouldTakeSnapshot(ctx)) return
	const r = await page.imageSnapshot()
	await expect(r).toMatchImageSnapshot()
})
