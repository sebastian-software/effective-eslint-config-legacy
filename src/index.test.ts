import { CLIEngine } from "eslint"

import { Json } from "./types"

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
  const sorted = cloneWithSortedKeys(config)

  sorted.parser = "[PATH]"
  sorted.parserOptions.project = "[PATH]"
  sorted.parserOptions.tsconfigRootDir = "[PATH]"

  return sorted
}

function runOnFile(fileName: string): Json {
  const cli = new CLIEngine({
    useEslintrc: false,
    ignore: false,
    configFile: "dist/index.js"
  })

  const retVal = cli.executeOnFiles([ fileName ]) as Json
  // eslint-disable-next-line no-param-reassign
  (retVal.results as Array<Json>).forEach((result) => { result.filePath = "[PATH]" })
  return retVal
}

test("Full JS/TS configuration result", () => {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  const tsConfig = extractConfig(cli, "src/index.ts")
  expect(JSON.stringify(tsConfig, null, 2)).toMatchSnapshot()

  const jsConfig = extractConfig(cli, "src/index.js")
  expect(JSON.stringify(jsConfig, null, 2)).toMatchSnapshot()

  const tsRules = tsConfig.rules
  const jsRules = jsConfig.rules

  const ruleNames = Object.keys(tsRules)
  const configDiff = []

  ruleNames.forEach((ruleName) => {
    const tsValue = JSON.stringify(tsRules[ruleName], null, 2)
    const jsValue = JSON.stringify(jsRules[ruleName], null, 2)

    if (tsValue !== jsValue) {
      configDiff.push({ ruleName, tsValue, jsValue })
    }
  })

  expect(configDiff).toMatchSnapshot()
})

test("load config in eslint to validate all rule syntax is correct", () => {
  expect(runOnFile("./src/fixtures/test1.ts")).toMatchSnapshot()
})

test("reports undeclared variable", () => {
  expect(runOnFile("./src/fixtures/test2.ts")).toMatchSnapshot()
})
