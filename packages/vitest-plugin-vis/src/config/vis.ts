import type { Plugin } from 'vite'
import { type SetupVisSuiteCommand, setupVisSuite } from '../server/commands/setup_vis_suite.ts'
import { visContext } from '../server/vis_context.ts'
import { NAME } from '../shared/constants.ts'
import type { VisOptions } from './types.ts'

declare module '@vitest/browser/context' {
	interface BrowserCommands extends SetupVisSuiteCommand {}
}

/**
 * Create a Vite plugin for visual testing.
 */
export function vis(options?: VisOptions) {
	visContext.setOptions(options)
	return {
		name: NAME,
		config() {
			return {
				test: {
					browser: {
						name: undefined as unknown as string,
						commands: {
							setupVisSuite,
						},
					},
				},
			}
		},
	} satisfies Plugin
}