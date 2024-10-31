import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin'
import react from '@vitejs/plugin-react'
import { storybookVis } from 'storybook-addon-vis/vitest-plugin'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), storybookTest(), storybookVis()],
	optimizeDeps: {
		include: ['@storybook/experimental-addon-test/internal/test-utils', '@vitest/coverage-v8'],
	},
	test: {
		browser: {
			enabled: true,
			headless: true,
			name: 'chromium',
			provider: 'playwright',
		},
		globals: true,
		include: [
			// But we are including them here to cover the scenario that
			// not all tests are stories.
			// Also, this is easier for the user to setup.
			'**/*.spec.ts?(x)',
			'**/*.stories.?(m)[jt]s?(x)',
		],
		setupFiles: ['./.storybook/vitest.setup.ts'],
	},
})
