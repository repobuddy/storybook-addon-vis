import { imageSnapshotSymbol } from './constants.js'
import type { ImageSnapshot } from './types.js'

export function isImageSnapshot(subject: any): subject is ImageSnapshot {
	return !!subject && subject.type === imageSnapshotSymbol
}

export function assertImageSnapshot(subject: any): asserts subject is ImageSnapshot {
	if (!isImageSnapshot(subject)) {
		throw new Error('Expected subject to be an image snapshot')
	}
}

export function toSnapshotId(taskName: string) {
	return `${taskName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`
}
