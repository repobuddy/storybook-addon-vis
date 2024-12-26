# Vitest Visual Testing Plugin

Vitest visual testing plugin allowing you to capture and compare image snapshots automatically and manually.

It requires [Vitest] and [Vitest Browser Mode][vitest-browser-mode] to work.

This plugin is inspired by [jest-image-snapshot],
and extracted from [storybook-addon-vis] for better modularity.

## Install

```sh
npm install --save-dev vitest-plugin-vis

pnpm add --save-dev vitest-plugin-vis

yarn add --save-dev vitest-plugin-vis
```

## Config

Vitest visual testing plugin supports zero-config setup.

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
  plugins: [vis()],
  test: {
    browser: {
      // typical browser config
      enabled: true,
      provider: 'playwright',
      name: 'chromium'
    }
  }
})
```

This default configuration will:

- Capture an image snapshot for each test automatically.
- The image snapshot will be compared with the previous snapshot with a failure threshold of `0 pixels`.
- Local (non-CI) image snapshots are saved in the `<root>/__vis__/local` directory.
- CI image snapshots are saved in the `<root>/__vis__/<process.platform>` directory.
- Image snapshots of the current test run are saved in the `<root>/__vis__/__results__` directory.
- Diff images are saved in the `<root>/__vis__/__diffs__` directory.

You can customize the configuration:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { vis } from 'vitest-plugin-vis/config'

export default defineConfig({
  plugins: [
    vis({
      autoSnapshot: true,
      snapshotRootDir: '__vis__',
      customizeSnapshotSubpath: (subpath) => subpath,
      customizeSnapshotId: (id, index) => `${id}-${index}`,
      diffOptions: undefined, // pixelmatch options
      failureThresholdType: 'pixel',
      failureThreshold: 0,
      timeout: 5000 // and 30000 on CI
    })
  ]
})
```

## Vitest Browser Mode

Vitest visual testing plugin runs on [Vitest Browser Mode][vitest-browser-mode].
Please follow its guide to set up your environment.

Bonus note, if you want to install `firefox` on WSL,
you can follow these steps: [Install Firefox on Ubuntu 22.04](https://askubuntu.com/a/1444967).

## Git Ignore

The local snapshots, current run results, and diffs should be ignored by git.
Add the following lines to your `.gitignore` file:

```sh
**/__vis__/__diffs__
**/__vis__/__results__
**/__vis__/local
```

## FAQ

> feature X in `jest-image-snapshot` is missing

Some features in `jest-image-snapshot` are not implemented in `vitest-plugin-vis` yet.
This is because through our own usage, we do not found a good use case for them.
For example, the `ssim` comparison method is not implemented in `vitest-plugin-vis`,
because we found that figuring out what is the delta using `ssim` is quite difficult.

If you have a good use case for these features, please open an issue or PR.

[jest-image-snapshot]: https://github.com/americanexpress/jest-image-snapshot
[storybook-addon-vis]: https://github.com/repobuddy/storybook-addon-vis
[vitest]: https://vitest.dev/
[vitest-browser-mode]: https://vitest.dev/guide/browser/