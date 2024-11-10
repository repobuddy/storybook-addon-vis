import { state } from './state.js'
import { createVisConfig } from './vis.js'

it('can define the snapshot root folder relative to the root of the project', async () => {
	await createVisConfig({
		snapshotPath: '_sp_',
	}).beforeAll({ name: 'some.test.ts', file: { filepath: 'dummy/some.test.ts' } }),
		expect(state.getSnapshotFilePaths()).toMatchObject({
			baselinePath: '_sp_/some.test.ts/can-define-the-snapshot-root-folder-relative-to-the-root-of-the-project-1.png',
			diffPath:
				'_sp_/__diff_output__/some.test.ts/can-define-the-snapshot-root-folder-relative-to-the-root-of-the-project-1.png',
			resultPath:
				'_sp_/__results__/some.test.ts/can-define-the-snapshot-root-folder-relative-to-the-root-of-the-project-1.png',
		})
})

it('can define the timeout value for taking the snapshot', async () => {
	await createVisConfig({
		timeout: 30000,
	}).beforeAll({ name: 'some.test.ts', file: { filepath: 'dummy/some.test.ts' } })

	expect(state.getTimeout()).toEqual(30000)
})

it('can define default failureThreshold', async () => {
	await createVisConfig({
		failureThreshold: 50,
	}).beforeAll({ name: 'some.test.ts', file: { filepath: 'dummy/some.test.ts' } })

	expect(state.mergeMatchImageSnapshotOptions()).toMatchObject({
		failureThreshold: 50,
	})
})

it('can define default failureThresholdType', async () => {
	await createVisConfig({
		customizeSnapshotId: (id) => id.slice(0, id.indexOf('-')),
	}).beforeAll({ name: 'some.test.ts', file: { filepath: 'dummy/some.test.ts' } })

	expect(state.getSnapshotFilePaths()).toMatchObject({
		baselinePath: '__snapshots__/local/some.test.ts/can.png',
		diffPath: '__snapshots__/local/__diff_output__/some.test.ts/can.png',
		resultPath: '__snapshots__/local/__results__/some.test.ts/can.png',
	})
})
