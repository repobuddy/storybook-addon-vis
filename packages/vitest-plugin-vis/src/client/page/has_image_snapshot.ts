import { type BrowserPage, commands } from '@vitest/browser/context'
import { toSnapshotId } from '../../shared/snapshot_id.ts'
import type { ImageSnapshotIdOptions } from '../../shared/types.ts'
import { ctx } from '../ctx.ts'

export interface HasImageSnapshotAction {
	hasImageSnapshot(this: BrowserPage, options?: ImageSnapshotIdOptions | undefined): Promise<boolean>
}

/**
 * Check if the snapshot image exists.
 */
export function hasImageSnapshot(this: BrowserPage, options?: ImageSnapshotIdOptions | undefined) {
	const test = ctx.getCurrentTest()
	if (!test) {
		throw new Error('`hasImageSnapshot()` must be called in a test.')
	}

	if (test.concurrent) {
		throw new Error(
			'`hasImageSnapshot()` cannot be called in a concurrent test because ' +
				"concurrent tests run at the same time in the same iframe and affect each other's environment. ",
		)
	}

	if (options?.customizeSnapshotId) {
		return commands
			.imageSnapshotNextIndex(test.name)
			.then((index) =>
				commands.hasImageSnapshot(test.name, options.customizeSnapshotId!(toSnapshotId(test.name), index)),
			)
	}

	return commands.hasImageSnapshot(test.name)
}