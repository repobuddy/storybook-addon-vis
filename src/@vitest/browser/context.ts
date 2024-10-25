import {
	getByAltText,
	getByLabelText,
	getByPlaceholderText,
	getByRole,
	getByTestId,
	getByText,
	getByTitle,
} from '@storybook/test'
import type { BrowserCommands, BrowserPage, CDPSession, Platform } from '@vitest/browser/context'
import type { SerializedConfig } from 'vitest'

let ctx: Awaited<typeof import('@vitest/browser/context')>

if ((globalThis as any).__vitest_browser__) {
	ctx = await import('@vitest/browser/context')
	// import('@vitest/browser/context').then((m) => (ctx = m))
}

// TODO: stub the functions within the `CDPSession`
// when we better understands the use cases
export function cdp(): CDPSession {
	return ctx?.cdp() ?? {}
}

export const commands = new Proxy<BrowserCommands>({} as any, {
	get(target, prop) {
		return (target as any)[prop] ?? (ctx?.commands as any)[prop]
	},
})

export const page = new Proxy<BrowserPage>(
	{
		getByAltText,
		getByRole,
		getByTestId,
		getByText,
		getByTitle,
		getByPlaceholder: getByPlaceholderText,
		getByLabelText,
	} as any,
	{
		get(target, prop) {
			return ((target as any)[prop] ?? ctx?.page)
				? (ctx?.page as any)[prop]
				: () => {
						console.info(`\`page.${prop.toString()}\` does not exist when running in browser`)
					}
		},
	},
)

export const server = new Proxy<{
	/**
	 * Platform the Vitest server is running on.
	 * The same as calling `process.platform` on the server.
	 */
	platform: Platform
	/**
	 * Runtime version of the Vitest server.
	 * The same as calling `process.version` on the server.
	 */
	version: string
	/**
	 * Name of the browser provider.
	 */
	provider: string
	/**
	 * Name of the current browser.
	 */
	browser: string
	/**
	 * Available commands for the browser.
	 * @see {@link https://vitest.dev/guide/browser/commands}
	 */
	commands: BrowserCommands
	/**
	 * Serialized test config.
	 */
	config: SerializedConfig
}>({} as any, {
	get(target, prop) {
		return (target as any)[prop] ?? (ctx?.server as any)[prop]
	},
})
