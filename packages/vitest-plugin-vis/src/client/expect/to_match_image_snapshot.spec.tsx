import { page } from '@vitest/browser/context'
import { afterEach, describe, expect, it } from 'vitest'
import { UNI_PNG_BASE64 } from '../../testing/constants.ts'
import { ctx } from '../ctx.ts'
import { setSnapshotMeta } from '../snapshot_meta.ts'

afterEach(() => ctx.__test__reset())

it('passes when not running in test', ({ task }) => {
	setSnapshotMeta(task, { enable: false })
	// stub as success when not in a test (e.g. in a story)
	ctx.getCurrentTest = () => undefined as any

	expect(document.body).toMatchImageSnapshot()
})

it('accepts a Locator', async () => {
	page.render(<div data-testid="subject">hello</div>)
	const subject = page.getByTestId('subject')
	await expect(subject).toMatchImageSnapshot()
})

it('accepts an element', async () => {
	page.render(<div data-testid="subject">hello</div>)
	const subject = page.getByTestId('subject')
	await expect(subject.element()).toMatchImageSnapshot()
})

it('accepts `document.body`', async () => {
	page.render(<div data-testid="subject">hello</div>)
	await expect(document.body).toMatchImageSnapshot()
})

it('accepts `baseElement` (same as body)', async () => {
	// the png file created is not valid
	const { baseElement } = page.render(<div data-testid="subject">hello</div>)
	await expect(baseElement).toMatchImageSnapshot()
})

it('accepts a base64 image', async () => {
	await expect(UNI_PNG_BASE64).toMatchImageSnapshot()
})

it('should fail immediately if the subject is a string but not base64 encoded', async () => {
	expect(() => expect('abc').toMatchImageSnapshot()).toThrowError(
		`'toMatchImageSnapshot()' expects the subject to be an element, locator, or image encoded in base64 string, but got: abc`,
	)
})

it.each([undefined, null, true, false, 1])('should fails immediately if the subject is %s', async (value) => {
	expect(() => expect(value).toMatchImageSnapshot()).toThrowError(
		`'toMatchImageSnapshot()' expects the subject to be an element, locator, or image encoded in base64 string, but got: ${value}`,
	)
})

it('fails when the image is different', async () => {
	const hasImageSnapshot = await page.hasImageSnapshot()
	page.render(<div data-testid="subject">{hasImageSnapshot ? 'Hello' : 'World'}</div>)
	const subject = page.getByTestId('subject')
	if (!hasImageSnapshot) {
		await expect(subject).toMatchImageSnapshot()
		return
	}
	await expect(subject)
		.toMatchImageSnapshot()
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/Expected image to match but was differ by \d+ pixels./)
			},
		)
})

it('fails when the image is smaller', async () => {
	const hasImageSnapshot = await page.hasImageSnapshot()
	const style = hasImageSnapshot ? { width: 64, height: 64 } : { width: 128, height: 128 }
	page.render(
		<div data-testid="subject" style={style}>
			Hello
		</div>,
	)
	const subject = page.getByTestId('subject')
	if (!hasImageSnapshot) {
		await expect(subject).toMatchImageSnapshot()
		return
	}
	await expect(subject)
		.toMatchImageSnapshot()
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/^Snapshot .* mismatched/)
				expect(error.message).toMatch(/The image size changed form 128x128 to 64x64/)
			},
		)
})

it('fails when the image is larger', async () => {
	const hasImageSnapshot = await page.hasImageSnapshot()
	const style = hasImageSnapshot ? { width: 128, height: 128 } : { width: 64, height: 64 }
	page.render(
		<div data-testid="subject" style={style}>
			Hello
		</div>,
	)
	const subject = page.getByTestId('subject')
	if (!hasImageSnapshot) {
		await expect(subject).toMatchImageSnapshot()
		return
	}
	await expect(subject)
		.toMatchImageSnapshot()
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/^Snapshot .* mismatched/)
				expect(error.message).toMatch(/The image size changed form 64x64 to 128x128/)
			},
		)
})

it('passes when the image is different but within failure threshold in pixels', async () => {
	page.render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot())) {
		await expect(subject).toMatchImageSnapshot({ customizeSnapshotId: (id) => id })
	}
	subject.element().innerHTML = 'unit text'
	await expect(subject).toMatchImageSnapshot({
		customizeSnapshotId: (id) => id,
		failureThreshold: 70,
	})
})

it('fails when the image is different beyond failure threshold in pixels', async () => {
	page.render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot())) {
		await expect(subject).toMatchImageSnapshot({ customizeSnapshotId: (id) => id })
	}
	subject.element().innerHTML = 'unit text'
	await expect(subject)
		.toMatchImageSnapshot({
			customizeSnapshotId: (id) => id,
			failureThreshold: 20,
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/Expected image to match within 20 pixels but was differ by \d+ pixels./)
			},
		)
})

it('passes when the image is different but within failure threshold in percentage', async () => {
	page.render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot())) {
		await expect(subject).toMatchImageSnapshot({ customizeSnapshotId: (id) => id })
	}
	subject.element().innerHTML = 'unit text'
	await expect(subject).toMatchImageSnapshot({
		customizeSnapshotId: (id) => id,
		failureThreshold: 1,
		failureThresholdType: 'percent',
	})
})

it('fails when the image is different beyond failure threshold in percentage', async () => {
	page.render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot())) {
		await expect(subject).toMatchImageSnapshot({ customizeSnapshotId: (id) => id })
	}
	subject.element().innerHTML = 'unit text'
	await expect(subject)
		.toMatchImageSnapshot({
			customizeSnapshotId: (id) => id,
			failureThreshold: 0.3,
			failureThresholdType: 'percent',
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/Expected image to match within 0.3% but was differ by \d+.\d+%./)
			},
		)
})

it('fails when the image is different in 0 percentage', async () => {
	page.render(<div data-testid="subject">unit test</div>)
	const subject = page.getByTestId('subject')

	if (!(await page.hasImageSnapshot())) {
		await expect(subject).toMatchImageSnapshot({ customizeSnapshotId: (id) => id })
	}
	subject.element().innerHTML = 'unit text'
	await expect(subject)
		.toMatchImageSnapshot({
			customizeSnapshotId: (id) => id,
			failureThresholdType: 'percent',
		})
		.then(
			() => {
				throw new Error('Should not reach')
			},
			(error) => {
				expect(error.message).toMatch(/Expected image to match but was differ by \d+.\d+%./)
			},
		)
})

describe(`${setSnapshotMeta.name}()`, () => {
	it('can disable auto snapshot', async ({ task }) => {
		setSnapshotMeta(task, { enable: false })
		expect(await page.hasImageSnapshot()).toBe(false)
	})
})