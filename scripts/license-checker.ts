const path = require('path')
const fs = require('fs')
const licenseChecker = require('license-checker')

// @TODO: Add support for custom license files
/* const allowedLicenses = [
  'Apache-2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'BSD-4-Clause',
  'ISC',
  'MIT',
  'MPL-2.0',
  'WTFPL',
  'Zlib',
  'CC-BY-3.0',
  'CC-BY-4.0',
  'CC0-1.0'
] */

type License = {
  licenses: string
  repository: string
  licenseFile: string
  email: string
  path: string
  publisher: string
}

type Packages = {
  [packageName: string]: License
}

const LICENCE_DIR = path.join(__dirname, '..')

const checkLicenses = () => {
  licenseChecker.init(
    {
      start: path.resolve(__dirname, '..'),
      production: true,
      excludePrivatePackages: true,
      // exclude: 'BSD', // licences to exclude
      excludePackages: `
        fsxa-api;
        fsxa-nuxt-module;
        fsxa-pattern-library;
        fsxa-ui
      ` // packages to exclude
    },
    (err: any, packages: Packages) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      const packagesWithInvalidLicenses: string[] = []
      const packagesWithValidLicenses: string[] = []

      Object.keys(packages).forEach((packageName) => {
        const license = packages[packageName].licenses
        if (!license) {
          packagesWithInvalidLicenses.push(packageName)
        } else {
          packagesWithValidLicenses.push(packageName)
        }
      })

      // Write valid licenses to file
      fs.writeFileSync(
        `${LICENCE_DIR}/valid-licenses.json`,
        JSON.stringify(packagesWithValidLicenses, null, 2) + '\n'
      )

      if (packagesWithInvalidLicenses.length) {
        // write licenses to file
        fs.writeFileSync(
          `${LICENCE_DIR}/invalid-licenses.json`,
          JSON.stringify(packagesWithInvalidLicenses, null, 2) + '\n'
        )
        console.error(
          `The following packages have invalid licenses: ${packagesWithInvalidLicenses.join(
            ', '
          )}`
        )
        process.exit(1)
      }

      console.log('All licenses are valid.')
      process.exit(0)
    }
  )
}

checkLicenses()
