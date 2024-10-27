import { copyFile as copyFileFs } from 'node:fs/promises'
import { mkdirp } from 'mkdirp'
import { dirname, join } from 'pathe'
import type { BrowserCommand } from 'vitest/node'

export const copyFile: BrowserCommand<[src: string, dest: string]> = async ({ testPath, provider }, src, dest) => {
	if (provider.name === 'playwright') {
		const destPath = join(dirname(testPath), dest)
		const destDir = dirname(destPath)
		await mkdirp(destDir)
		return copyFileFs(join(dirname(testPath), src), destPath)
	}

	throw new Error(`provider ${provider.name} is not supported`)
}
