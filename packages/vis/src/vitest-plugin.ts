import type { Plugin } from 'vitest/config'
import './augment.js'
import { copyFile } from './vitest-plugin/commands/copy_file.js'
import { existDir } from './vitest-plugin/commands/exist_dir.js'
import { existFile } from './vitest-plugin/commands/exist_file.js'
import { getSnapshotPlatform } from './vitest-plugin/commands/get_snapshot_platform.js'
import { isCI } from './vitest-plugin/commands/is_ci.js'
import { rmDir } from './vitest-plugin/commands/rm_dir.js'

export function storybookVis() {
	return {
		name: 'vitest:storybook-addon-vis',
		config() {
			return {
				test: {
					browser: {
						name: 'chromium',
						commands: {
							existDir,
							existFile,
							copyFile,
							rmDir,
							isCI,
							getSnapshotPlatform,
						},
					},
				},
			}
		},
	} satisfies Plugin
}
