import { readFile, writeFile } from 'node:fs/promises'

export const file = {
	async tryReadFileBase64(filePath: string): Promise<string | undefined> {
		return readFile(filePath, { encoding: 'base64' }).catch(() => undefined)
	},
	writeFileBase64(filePath: string, data: string) {
		return writeFile(filePath, data, { encoding: 'base64' })
	},
}