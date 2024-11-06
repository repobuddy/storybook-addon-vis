///  <reference types="@vitest/browser/context" />

import type { HasImageSnapshotAction } from './@vitest/browser/page.has_image_snapshot'
import type { ImageSnapshotAction } from './@vitest/browser/page.image_snapshot'
import type { ImageSnapshotMatcher } from './expect.to_match_image_snapshot'
import type { CopyFileCommand } from './vitest-plugin/commands/copy_file'
import type { ExistDirCommand } from './vitest-plugin/commands/exist_dir'
import type { ExistFileCommand } from './vitest-plugin/commands/exist_file'
import type { GetSnapshotPlatformCommand } from './vitest-plugin/commands/get_snapshot_platform'
import type { IsCICommand } from './vitest-plugin/commands/is_ci'
import type { RmDirCommand } from './vitest-plugin/commands/rm_dir'

declare module '@vitest/browser/context' {
	interface BrowserPage extends ImageSnapshotAction, HasImageSnapshotAction {}
	interface BrowserCommands
		extends CopyFileCommand,
			ExistDirCommand,
			GetSnapshotPlatformCommand,
			RmDirCommand,
			IsCICommand,
			ExistFileCommand {}
}

declare global {
	namespace jest {
		// biome-ignore lint/correctness/noUnusedVariables: augmentation must have matching type params.
		interface Matchers<R, T> extends ImageSnapshotMatcher {}
	}
}
