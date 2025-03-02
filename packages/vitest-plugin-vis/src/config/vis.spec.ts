import type { Options } from 'ssim.js'
import { afterEach, it } from 'vitest'
import { vis } from '../config.ts'
import { visContext } from '../server/vis_context.ts'

afterEach(() => visContext.__test__reset())

it('can be used with zero config', ({ expect }) => {
	expect(vis()).toBeDefined()
})

it('can set the platform', ({ expect }) => {
	vis({ platform: 'custom' }).config({ test: { name: 'proj' } })

	expect(visContext.__test__getOptions('proj')).toEqual({
		platform: 'custom',
	})
})

it('can customize snapshot root directory', ({ expect }) => {
	vis({ snapshotRootDir: 'custom' }).config({ test: { name: 'proj' } })

	expect(visContext.__test__getOptions('proj')).toEqual({
		snapshotRootDir: 'custom',
	})
})

it('can customize snapshot subpath to keep base folder', ({ expect }) => {
	const customizeSnapshotSubpath = (subPath: string): string => subPath

	vis({ customizeSnapshotSubpath }).config({ test: { name: 'proj' } })

	expect(visContext.__test__getOptions('proj')).toMatchObject({
		customizeSnapshotSubpath,
	})
})

it('can set default snapshot id', ({ expect }) => {
	const customizeSnapshotId = ({ id }: { id: string }) => id

	vis({ customizeSnapshotId }).config({ test: { name: 'proj' } })

	expect(visContext.__test__getOptions('proj')).toMatchObject({
		customizeSnapshotId,
	})
})

it('can set default snapshot timeout', ({ expect }) => {
	vis({ timeout: 1000 }).config({ test: { name: 'proj' } })

	expect(visContext.__test__getOptions('proj')).toMatchObject({
		timeout: 1000,
	})
})

it('can set default failure threshold', ({ expect }) => {
	vis({ failureThreshold: 0.01 }).config({ test: { name: 'proj' } })

	expect(visContext.__test__getOptions('proj')).toMatchObject({
		failureThreshold: 0.01,
	})
})

it('can set default failure threshold type to percent', ({ expect }) => {
	vis({ failureThresholdType: 'percent' }).config({ test: { name: 'proj' } })

	expect(visContext.__test__getOptions('proj')).toMatchObject({
		failureThresholdType: 'percent',
	})
})

it('can set default diff options', ({ expect }) => {
	const diffOptions = { threshold: 0.1 }

	vis({ diffOptions }).config({ test: { name: 'proj' } })

	expect(visContext.__test__getOptions('proj')).toMatchObject({
		diffOptions,
	})
})

it('default preset is auto', ({ expect }) => {
	const plugin = vis()
	expect(plugin.config({ test: { name: 'proj' } })).toMatchObject({
		test: {
			setupFiles: ['vitest-plugin-vis/presets/auto'],
		},
	})
})

it('can set preset to manual', ({ expect }) => {
	const plugin = vis({ preset: 'manual' })
	expect(plugin.config({ test: { name: 'proj' } })).toMatchObject({
		test: {
			setupFiles: ['vitest-plugin-vis/presets/manual'],
		},
	})
})

it('can set preset to enable', ({ expect }) => {
	const plugin = vis({ preset: 'enable' })
	expect(plugin.config({ test: { name: 'proj' } })).toMatchObject({
		test: {
			setupFiles: ['vitest-plugin-vis/presets/enable'],
		},
	})
})

it('default to no preset when options is set', ({ expect }) => {
	const plugin = vis({})
	expect(plugin.config({ test: { name: 'proj' } })).toMatchObject({
		test: {
			setupFiles: [],
		},
	})
})

it('can set preset to none', ({ expect }) => {
	const plugin = vis({ preset: 'none' })

	expect(plugin.config({ test: { name: 'proj' } })).toMatchObject({
		test: {
			setupFiles: [],
		},
	})
})

it('can set pixelmatch options when comparison method is pixel', ({ expect }) => {
	const diffOptions = { threshold: 0.1 }

	vis({ comparisonMethod: 'pixel', diffOptions }).config({ test: { name: 'proj' } })

	expect(visContext.__test__getOptions('proj')).toMatchObject({
		comparisonMethod: 'pixel',
		diffOptions,
	})
})

it('can set ssim options when comparison method is ssim', ({ expect }) => {
	const diffOptions: Partial<Options> = { ssim: 'bezkrovny' }

	vis({ comparisonMethod: 'ssim', diffOptions }).config({ test: { name: 'proj' } })

	expect(visContext.__test__getOptions('proj')).toMatchObject({
		comparisonMethod: 'ssim',
		diffOptions,
	})
})

it('can set the subject data test id', ({ expect }) => {
	vis({ subjectDataTestId: 'test' }).config({ test: { name: 'proj' } })
	expect(visContext.__test__getOptions('proj')).toMatchObject({
		subjectDataTestId: 'test',
	})
})
