import type { BrowserPage } from '@vitest/browser/context'
import { toImageData } from '../../image_data.js'
import { store } from '../../store.js'
import { imageSnapshotSymbol } from './constants.js'
import type { ImageSnapshot, ImageSnapshotOptions } from './types.js'

export interface ImageSnapshotAction {
	imageSnapshot(this: BrowserPage, options?: ImageSnapshotOptions | undefined): Promise<ImageSnapshot>
}

export async function imageSnapshot(
	this: BrowserPage,
	options?: ImageSnapshotOptions | undefined,
): Promise<ImageSnapshot> {
	const { snapshotFilename, baselinePath, resultPath, diffPath } = store.getSnapshotFilePaths(options)
	// console.debug('taking snapshot', state.getName(), snapshotFilename)
	const screenshot = await this.screenshot({
		base64: true,
		path: resultPath,
		element: options?.element,
		timeout: store.getTimeout(options?.timeout),
	})
	store.incrementSnapshotIndex()
	const image = await toImageData(screenshot.base64)

	return {
		type: imageSnapshotSymbol,
		snapshotFilename,
		baselinePath,
		resultPath,
		diffPath,
		base64: screenshot.base64,
		image,
	}
}
