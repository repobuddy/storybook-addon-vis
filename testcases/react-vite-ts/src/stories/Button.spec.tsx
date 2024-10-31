import { render } from '@testing-library/react'
import { page } from 'storybook-addon-vis'
import { expect, it } from 'vitest'
import { Button } from './Button'

it('container snapshot', async () => {
	const { getByText, container } = await render(<Button label="Button" />)
	const subject = getByText('Button')
	expect(subject).toBeInTheDocument()
	expect(page.imageSnapshot({ element: container })).toMatchImageSnapshot()
})

it('subject snapshot', async () => {
	const { getByText } = await render(<Button label="Button" />)
	const subject = getByText('Button')
	expect(subject).toBeInTheDocument()
	await expect(page.imageSnapshot({ element: subject })).toMatchImageSnapshot()
})
