import { type ImageSnapshotIdOptions, toTaskId } from 'vitest-plugin-vis/client'
import { commands, getCurrentTest } from './vitest_proxy.ts'

/**
 * Check if the snapshot image exists.
 */
export function hasImageSnapshot(options?: ImageSnapshotIdOptions | undefined) {
	const test = getCurrentTest()
	if (!test) return false

	const taskId = toTaskId(test)
	if (options?.customizeSnapshotId) {
		return commands
			.imageSnapshotNextIndex(taskId)
			.then((index) => commands.hasImageSnapshot(taskId, options.customizeSnapshotId!(taskId, index)))
	}

	return commands.hasImageSnapshot(taskId)
}
