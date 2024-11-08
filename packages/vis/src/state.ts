import { join } from 'pathe'
import type { ImageSnapshotOptions } from './@vitest/browser/types'
import type { MatchImageSnapshotOptions } from './expect.to_match_image_snapshot'

export const state = {
	name: '',
	testFilepath: '',
	taskName: '',
	snapshot: {},
	getSnapshotFilePaths(options?: ImageSnapshotOptions | undefined) {
		const index = state.snapshot[state.testFilepath][state.id]!.index++
		const snapshotFilename = options?.customizeSnapshotId
			? `${options.customizeSnapshotId(state.id, index)}.png`
			: `${state.id}-${index}.png`
		const baselinePath = join(state.baselineDir, snapshotFilename)
		const resultPath = join(state.resultDir, snapshotFilename)
		const diffPath = join(state.diffDir, snapshotFilename)
		return { snapshotFilename, baselinePath, resultPath, diffPath }
	},
} as unknown as {
	id: string
	name: string
	testFilepath: string
	testFilename: string
	projectDir: string
	baselineDir: string
	resultDir: string
	diffDir: string
	taskName: string
	parameters: {
		snapshot?: MatchImageSnapshotOptions | undefined
		[key: string]: any
	}
	snapshot: Record<string, Record<string, { index: number }>>
	getSnapshotFilePaths(options?: ImageSnapshotOptions | undefined): {
		snapshotFilename: string
		baselinePath: string
		resultPath: string
		diffPath: string
	}
}
