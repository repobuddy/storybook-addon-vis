import { basename } from 'pathe'
import { expect, it } from 'vitest'
import { page } from './context.js'
import { toId } from './page.image_snapshot.js'

it('save file under __results__', async ({ task }) => {
	const f1 = await page.imageSnapshot()
	const filename = basename(task.file.name)
	expect(f1.resultPath).toMatch(`../../../__snapshots__/__results__/${filename}/${toId(task.name)}-1.png`)

	const f2 = await page.imageSnapshot()
	expect(f2.resultPath).toMatch(`../../../__snapshots__/__results__/${filename}/${toId(task.name)}-2.png`)
})
