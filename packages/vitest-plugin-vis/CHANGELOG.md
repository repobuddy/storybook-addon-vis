# vitest-plugin-vis

## 1.1.0

### Minor Changes

- [`0360253`](https://github.com/repobuddy/storybook-addon-vis/commit/03602536b5ebf67b7d898f95d6511e5b05da96a9) Thanks [@unional](https://github.com/unional)! - Depreacate `toTaskId`.

- [#133](https://github.com/repobuddy/storybook-addon-vis/pull/133) [`badf227`](https://github.com/repobuddy/storybook-addon-vis/commit/badf2273828ad883763e1e328b4e180c07b4960a) Thanks [@unional](https://github.com/unional)! - Perform image comparison on the client side.
  This is similar to `storybook-addon-vis@0.13.0`, but the image taking is still done on the server side.

  Try to address the issue of the slower image comparison on the server side.

  Export `matchImageSnapshot` function on the client side.
  Mark `parseImageSnapshotSubject` as deprecated as it is not needed anymore.

### Patch Changes

- [#136](https://github.com/repobuddy/storybook-addon-vis/pull/136) [`176d28f`](https://github.com/repobuddy/storybook-addon-vis/commit/176d28fc459cb0823f3fda94ad4e3372690dbd8d) Thanks [@unional](https://github.com/unional)! - Update error message during threshold conversion.

- [#135](https://github.com/repobuddy/storybook-addon-vis/pull/135) [`6912ad7`](https://github.com/repobuddy/storybook-addon-vis/commit/6912ad73041f7e46757f0f364dcaa6594a35ce9d) Thanks [@unional](https://github.com/unional)! - Improve options message.

## 1.0.5

### Patch Changes

- [#130](https://github.com/repobuddy/storybook-addon-vis/pull/130) [`e242444`](https://github.com/repobuddy/storybook-addon-vis/commit/e242444908766274014b5fc94afaf31392627c88) Thanks [@unional](https://github.com/unional)! - Add update snapshot back to the server implementation.

## 1.0.4

### Patch Changes

- [#128](https://github.com/repobuddy/storybook-addon-vis/pull/128) [`d695c4f`](https://github.com/repobuddy/storybook-addon-vis/commit/d695c4fb0b0be80ce53e38884fcb7a6340a8e52d) Thanks [@unional](https://github.com/unional)! - Avoid buffer conversion.

## 1.0.3

### Patch Changes

- [#125](https://github.com/repobuddy/storybook-addon-vis/pull/125) [`1068941`](https://github.com/repobuddy/storybook-addon-vis/commit/1068941b1495966cb3ee15a53dd5937e37365373) Thanks [@unional](https://github.com/unional)! - Try to improve the performance of the plugin by skipping the rescale step and not checking the CRC of the image.

  This should be safe because the image is generated by the browser, or it is a base64 string (not 100% sure on this), and the CRC is not used for anything.

  If not performance improvement is seen, we can revert this change.

## 1.0.2

### Patch Changes

- [#123](https://github.com/repobuddy/storybook-addon-vis/pull/123) [`a8fcd75`](https://github.com/repobuddy/storybook-addon-vis/commit/a8fcd75a056cb5b16006c52190453f19e41ab182) Thanks [@unional](https://github.com/unional)! - Avoid resizing images when not necessary.

## 1.0.1

### Patch Changes

- [#117](https://github.com/repobuddy/storybook-addon-vis/pull/117) [`ae98ec4`](https://github.com/repobuddy/storybook-addon-vis/commit/ae98ec47df104c80723892345946aebb65cb361c) Thanks [@unional](https://github.com/unional)! - Proxy `vitest/suite`.

  This fix the warning message `Module "util" has been externalized for browser compatibility.` when it is loaded in the browser.

  Fixes [#101](https://github.com/repobuddy/storybook-addon-vis/issues/101).

## 1.0.0

### Major Changes

- [#102](https://github.com/repobuddy/storybook-addon-vis/pull/102) [`03893ab`](https://github.com/repobuddy/storybook-addon-vis/commit/03893ab4efae5f2d243bad67f40bc5cb4ad4d623) Thanks [@unional](https://github.com/unional)! - Initial Release.

  [`vitest-plugin-vis`](https://www.npmjs.com/package/vitest-plugin-vis) is a visual testing plugin for [Vitest](https://vitest.dev/), running on [Vitest Browser Mode](https://vitest.dev/guide/browser/).
