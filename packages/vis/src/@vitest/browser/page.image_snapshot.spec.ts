import { basename } from 'pathe'
import { expect, it } from 'vitest'
import { commands, page } from './context.js'
import { toSnapshotId } from './image_snapshot.logic.js'

it('save file under __results__', async ({ task }) => {
	const f1 = await page.imageSnapshot()
	const filename = basename(task.file.name)
	expect(f1.resultPath).toMatch(
		`../../../__snapshots__/${await commands.getSnapshotPlatform()}/__results__/${filename}/${toSnapshotId(task.name)}-1.png`,
	)

	const f2 = await page.imageSnapshot()
	expect(f2.resultPath).toMatch(
		`../../../__snapshots__/${await commands.getSnapshotPlatform()}/__results__/${filename}/${toSnapshotId(task.name)}-2.png`,
	)
})
