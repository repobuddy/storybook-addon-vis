import ci from 'is-ci'
import { rimraf } from 'rimraf'

export const ctx = {
	rimraf,
	getSnapshotPlatform() {
		/* v8 ignore next */
		return ci ? process.platform : 'local'
	},
}
