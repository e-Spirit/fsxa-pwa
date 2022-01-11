# [3.0.0](https://github.com/e-Spirit/fsxa-pwa/compare/v2.0.2...v3.0.0) (2022-01-11)


### Features

* update usage of fetchByFilter calls from fsxa-api ([#57](https://github.com/e-Spirit/fsxa-pwa/issues/57)) ([0700ddd](https://github.com/e-Spirit/fsxa-pwa/commit/0700dddee803d17034c0c0a47c6c2529d19e112d))


### BREAKING CHANGES

* fetchByFilter's returned items are now stored in the 'items' property of the
response

## [2.0.2](https://github.com/e-Spirit/fsxa-pwa/compare/v2.0.1...v2.0.2) (2021-12-21)


### Bug Fixes

* **config:** add FSXA_MODE to nuxt module payload ([#56](https://github.com/e-Spirit/fsxa-pwa/issues/56)) ([35a8918](https://github.com/e-Spirit/fsxa-pwa/commit/35a8918138402fb4cec4bfdcdd7142d182c8a74d))

## [2.0.1](https://github.com/e-Spirit/fsxa-pwa/compare/v2.0.0...v2.0.1) (2021-12-20)


### Bug Fixes

* Update fsxa-nuxt-module version ([#55](https://github.com/e-Spirit/fsxa-pwa/issues/55)) ([a931813](https://github.com/e-Spirit/fsxa-pwa/commit/a931813a55f4dacf2f2c16b0d77e6c934e7fa00f))

# [2.0.0](https://github.com/e-Spirit/fsxa-pwa/compare/v1.4.5...v2.0.0) (2021-12-15)


### Features

* enable usage of navigationFilter and preFilterFetch ([#54](https://github.com/e-Spirit/fsxa-pwa/issues/54)) ([228aaec](https://github.com/e-Spirit/fsxa-pwa/commit/228aaec399133251858cd6c38824d5cccd24ca39)), closes [#53](https://github.com/e-Spirit/fsxa-pwa/issues/53)


### BREAKING CHANGES

* The original fsxa-api class was removed and the new ones FSXAProxyApi and FSXARemoteApi are used. Their have a slightly different, but better, method signatures. For more information, please read the migration guide in the CHANGELOG of the FSXA-API.

* Environment variables FSXA_HOST and FSXA_PORT has be configured in your production environments. Make sure to set the variables in your PWA deployments. In testing scenarios, localhost:3000 will be used.

## [1.4.5](https://github.com/e-Spirit/fsxa-pwa/compare/v1.4.4...v1.4.5) (2021-11-03)


### Bug Fixes

* fix language switch and provide further documentation ([#46](https://github.com/e-Spirit/fsxa-pwa/issues/46)) ([7f73410](https://github.com/e-Spirit/fsxa-pwa/commit/7f7341057811d0601e439cf671830db1eda9031a))

### Documentation
* add a new chapter for debugging ([#48](https://github.com/e-Spirit/fsxa-pwa/issues/48)) ([6407861](https://github.com/e-Spirit/fsxa-pwa/commit/6407861839c7aa887613b85f1262dc3f9f1a763f))
* add documentation for usage of FSXA_API_BASE_URL environment variable ([#45](https://github.com/e-Spirit/fsxa-pwa/issues/45)) ([dcd122a](https://github.com/e-Spirit/fsxa-pwa/commit/dcd122ae8b34cc3fcec8758007e905051083c4b0))


## [1.4.4](https://github.com/e-Spirit/fsxa-pwa/compare/v1.4.3...v1.4.4) (2021-09-14)


### Bug Fixes

* update dependencies ([#42](https://github.com/e-Spirit/fsxa-pwa/issues/42)) ([22087f9](https://github.com/e-Spirit/fsxa-pwa/commit/22087f99b0d51141f7da08f1391a0147e8713320))

## [1.4.3](https://github.com/e-Spirit/fsxa-pwa/compare/v1.4.2...v1.4.3) (2021-07-09)


### Bug Fixes

* **misc:** provide Dockerfile.template and documentation & bumped few versions ([1bba352](https://github.com/e-Spirit/fsxa-pwa/commit/1bba352f14586df5afd5c1df29193c757d1878a1))

## [1.4.2](https://github.com/e-Spirit/fsxa-pwa/compare/v1.4.1...v1.4.2) (2021-06-29)


### Bug Fixes

* Optimize dependencies for runtime environments ([#39](https://github.com/e-Spirit/fsxa-pwa/issues/39)) ([4f13102](https://github.com/e-Spirit/fsxa-pwa/commit/4f1310255c1dd8c511bba2816c88fe7f98e2eb8d))

## [1.4.1](https://github.com/e-Spirit/fsxa-pwa/compare/v1.4.0...v1.4.1) (2021-05-12)


### Bug Fixes

* bumped fsxa-pattern-library version, removed unnecessary description in interactive video ([a22c5c2](https://github.com/e-Spirit/fsxa-pwa/commit/a22c5c271c8f9af81a06b48a744f6f9d45386639))

# [1.4.0](https://github.com/e-Spirit/fsxa-pwa/compare/v1.3.0...v1.4.0) (2021-05-10)


### Features

* updated tailwind and enabled jit-mode. Updated fsxa-ui ([30a3a49](https://github.com/e-Spirit/fsxa-pwa/commit/30a3a49787d6fc8928d57145ee7f527f172f64b6))

# [1.3.0](https://github.com/e-Spirit/fsxa-pwa/compare/v1.2.0...v1.3.0) (2021-05-05)


### Features

* upgraded fsxa-api, fsxa-pattern-library, fsxa-nuxt-module ([3d6aa4d](https://github.com/e-Spirit/fsxa-pwa/commit/3d6aa4ddb66c92272694de5ef636975b6f1297f4))

# [1.2.0](https://github.com/e-Spirit/fsxa-pwa/compare/v1.1.0...v1.2.0) (2021-03-16)


### Features

* TNG-733 Add simple InteractiveYouTubeVideo component ([#13](https://github.com/e-Spirit/fsxa-pwa/issues/13)) ([ad026b9](https://github.com/e-Spirit/fsxa-pwa/commit/ad026b925be467b72ab85e4d9fe105fdf38dca78))

# [1.1.0](https://github.com/e-Spirit/fsxa-pwa/compare/v1.0.3...v1.1.0) (2021-03-15)


### Features

* Upgraded fsxa-api, fsxa-ui, fsxa-pattern-library and fsxa-nuxt-module ([#12](https://github.com/e-Spirit/fsxa-pwa/issues/12)) ([8a5515a](https://github.com/e-Spirit/fsxa-pwa/commit/8a5515a72386ab22779a11d89d426d0903c813d0))

## [1.0.3](https://github.com/e-Spirit/fsxa-pwa/compare/v1.0.2...v1.0.3) (2021-03-12)


### Bug Fixes

* **product list view:** fixed an issue where product category filtering only worked in german ([bc28092](https://github.com/e-Spirit/fsxa-pwa/commit/bc2809269f891ceb791bf0e74b570dc7c54a2f5a))

## [1.0.2](https://github.com/e-Spirit/fsxa-pwa/compare/v1.0.1...v1.0.2) (2021-03-03)


### Bug Fixes

* **tailwind prefixes:** updated fsxa-ui dependency and removed unnecessary prefixes ([1af005d](https://github.com/e-Spirit/fsxa-pwa/commit/1af005d6d27a609beba4096199e1906873da9d4e))

## [1.0.1](https://github.com/e-Spirit/fsxa-pwa/compare/v1.0.0...v1.0.1) (2021-02-01)


### Bug Fixes

* **fsxa.config.ts:** add richtext-path to fsxa.config.ts ([6fda837](https://github.com/e-Spirit/fsxa-pwa/commit/6fda83745ff7cd3b4870d943287869322fbde90f))

# 1.0.0 (2021-01-20)


### Bug Fixes

* **tailwindcss:** configure purgecss to keep used classes ([f87faaa](https://github.com/e-Spirit/fsxa-pwa/commit/f87faaa09923205342901e22c20b8eee6fda4154))
