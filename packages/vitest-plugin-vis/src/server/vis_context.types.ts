export type VisState = {
	projectPath: string
	// platform: string
	testTimeout: number
	hookTimeout: number
	snapshotRootDir: string
	snapshotBaselineDir: string
	snapshotResultDir: string
	snapshotDiffDir: string
	snapshotRootPath: string
	subjectDataTestId: string | undefined
	suites: Record<
		string,
		{
			baselineDir: string
			resultDir: string
			diffDir: string
			tasks: Record<
				string,
				{
					count: number
				}
			>
		}
	>
}
export type PartialBrowserCommandContext = {
	project: {
		config: {
			root: string
			snapshotOptions: {
				updateSnapshot: 'all' | 'new' | 'none'
			}
			testTimeout: number
			hookTimeout: number
		}
		vite: {
			config: {
				test?: {
					name: string
				}
			}
		}
	}
	provider: {
		name: string
		browserName: string
		options: {
			headless: boolean | undefined
			screenshotFailures: boolean | undefined
			screenshotDirectory: string | undefined
		}
	}
	testPath: string
}
