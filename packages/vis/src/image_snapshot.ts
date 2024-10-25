import { imageSnapshotSymbol } from './constants'
import type { ImageSnapshot } from './vitest-plugin/types'

export function isImageSnapshot(subject: any): subject is ImageSnapshot {
	return !!subject && subject.type === imageSnapshotSymbol
}

export function assertImageSnapshot(subject: any): asserts subject is ImageSnapshot {
	if (!isImageSnapshot(subject)) {
		throw new Error('Expected subject to be an image snapshot')
	}
}
