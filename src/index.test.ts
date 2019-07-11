import { CLIEngine } from "eslint"

const PATH_REPL = /"\S+(\\|\/)parser\.js"/

function fixJestRequire() {
  // Jest overrides this, but it breaks the "Unicorn" package.
  // See also: https://github.com/sindresorhus/import-modules/issues/2
  require.extensions = {
    '.js': require('default-require-extensions/js')
  }
}

function cloneWithSortedKeys(obj: any): any {
  const clone: { [key: string]: any } = {}
  const keys = Object.keys(obj).sort()
  keys.forEach((key) => {
    const value = obj[key]
    if (typeof value === "object" && !Array.isArray(value)) {
      clone[key] = cloneWithSortedKeys(value)
    } else {
      clone[key] = value
    }
  })
  return clone
}

function extractConfig(cli: CLIEngine, file: string) {
  const config = cli.getConfigForFile(file)
  const result = JSON.stringify(cloneWithSortedKeys(config), null, "  ")
  return result.replace(new RegExp(PATH_REPL), '"[PATH]"')
}

test("Full configuration result", () => {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  expect(extractConfig(cli, "src/index.js")).toMatchSnapshot()
})

test("load config in eslint to validate all rule syntax is correct", () => {
  fixJestRequire()

  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  const code = "const first = 1\nfunction second() {}\nsecond(first)\n"
  const result = cli.executeOnText(code)

  expect(result).toMatchSnapshot()
})

test("reports undeclared variable", () => {
  fixJestRequire()

  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  const code = "i++"
  const result = cli.executeOnText(code)

  expect(result).toMatchSnapshot()
})
