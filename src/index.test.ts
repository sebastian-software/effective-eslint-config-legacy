import { CLIEngine } from "eslint"

const PATH_REPL = /"\S+(\\|\/)index\.js"/

function cloneWithSortedKeys(object): any {
  const clone: { [key: string]: any } = {}
  const keys = Object.keys(object).sort()
  keys.forEach((key) => {
    const value = object[key]
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
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  const code = "const first = 1\nfunction second() {}\nsecond(first)\n"
  const result = cli.executeOnText(code)

  expect(result).toMatchSnapshot()
})

test("reports undeclared variable", () => {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  const code = "i++"
  const result = cli.executeOnText(code)

  expect(result).toMatchSnapshot()
})
