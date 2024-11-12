import { dirname, join, relative } from 'pathe'
import type { StoryContext } from 'storybook/internal/types'
import { omit, required } from 'type-plus'
import { getCurrentTest } from 'vitest/suite'
import { commands } from './@vitest/browser/context.js'
import { toSnapshotId } from './@vitest/browser/image_snapshot.logic'
import type { ImageSnapshotOptions } from './@vitest/browser/types'
import type { MatchImageSnapshotOptions } from './expect.to_match_image_snapshot'
import type { VisOptions } from './types.js'

function createStore() {
	// test suite (runner.beforeAll) states
	let testFilepath: string
	let currentDir: string
	let baselineDir: string
	let resultDir: string
	let diffDir: string
	let snapshot: Record<string, Record<string, { index: number }>>
	let suiteOptions: VisOptions = {}

	// story states (story.beforeEach)
	let tags: string[] | undefined
	let parameters: Record<string, any> | undefined
	let taskName: string
	let id: string

	const state = {
		baselineDir,
		resultDir,
		diffDir,
		snapshot: {},
		async setupSuite(suite: { file: { filepath: string }; name: string }, options: VisOptions = {}) {
			// console.debug('setupSuite', suite.name)
			testFilepath = suite.file.filepath
			const projectDir = testFilepath.slice(0, -suite.name.length)

			const snapshotPath = resolveSnapshotPath(await getPlatform(), options)
			const snapshotFullPath = join(projectDir, snapshotPath)
			currentDir = dirname(testFilepath)
			const suiteDir = trimSuiteDir(suite.name, options)
			baselineDir = relative(currentDir, join(snapshotFullPath, suiteDir))
			resultDir = relative(currentDir, join(snapshotFullPath, '__results__', suiteDir))
			diffDir = relative(currentDir, join(snapshotFullPath, '__diff_output__', suiteDir))

			suiteOptions = options
			snapshot = snapshot ?? {}
			if (!snapshot[testFilepath]) {
				snapshot[testFilepath] = {}
				await commands.rmDir(resultDir)
				await commands.rmDir(diffDir)
			}
		},
		setupStory(ctx: StoryContext) {
			// console.debug('setupStory', ctx.name)
			tags = ctx.tags
			parameters = ctx.parameters
		},
		shouldTakeSnapshot() {
			// console.debug('shouldTakeSnapshot', taskName, tags)
			if (!tags) return false
			return tags.lastIndexOf('!snapshot') < tags.lastIndexOf('snapshot')
		},
		getName() {
			return taskName
		},
		getCurrentDir() {
			return currentDir
		},
		getTimeout(timeout?: number | undefined) {
			return timeout ?? suiteOptions.timeout ?? 30000
		},
		mergeMatchImageSnapshotOptions(options?: MatchImageSnapshotOptions) {
			return required(omit(suiteOptions, 'snapshotRootDir', 'customizeSnapshotSubpath'), parameters?.snapshot, options)
		},
		getSnapshotFilePaths(options?: ImageSnapshotOptions | undefined) {
			const test = getCurrentTest()
			taskName = test.name
			id = toSnapshotId(taskName)
			snapshot[testFilepath][id] = snapshot[testFilepath][id] ?? { index: 1 }

			const index = snapshot[testFilepath][id]!.index
			const customizeSnapshotId =
				suiteOptions.customizeSnapshotId ?? options?.customizeSnapshotId ?? ((id, index) => `${id}-${index}`)
			const snapshotFilename = `${customizeSnapshotId(id, index)}.png`
			const baselinePath = join(baselineDir, snapshotFilename)
			const resultPath = join(resultDir, snapshotFilename)
			const diffPath = join(diffDir, snapshotFilename)
			return { snapshotFilename, baselinePath, resultPath, diffPath }
		},
		incrementSnapshotIndex() {
			snapshot[testFilepath][id]!.index++
		},
	}
	return state
}

export const state = createStore()

function resolveSnapshotPath(platform: string, options: VisOptions) {
	return options.snapshotRootDir ?? `__vis__/${platform}`
}

function trimSuiteDir(suiteName: string, options: VisOptions) {
	const customizeSnapshotSubpath = options.customizeSnapshotSubpath ?? defaultCustomizeSnapshotSubpath
	return customizeSnapshotSubpath(suiteName)
}

function defaultCustomizeSnapshotSubpath(suiteName: string) {
	const [suiteDir] = suiteName.split('/', 1)
	if (['tests', 'test', 'src', 'source', 'js', 'ts', 'lib'].includes(suiteDir))
		return suiteName.slice(suiteDir.length + 1)
	return suiteName
}

let platformP: Promise<string>
function getPlatform(): Promise<string> {
	if (platformP) return platformP

	return (platformP = commands.getSnapshotPlatform())
}
