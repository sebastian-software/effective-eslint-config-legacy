import { ESLint } from "eslint"

type Dict = { [key: string]: any }
type Diff = {
  ruleName: string
  tsValue: string
  jsValue: string
}

function cloneWithSortedKeys(obj: Dict): any {
  const clone: Dict = {}
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

async function extractConfig(linter: ESLint, file: string) {
  const config = await linter.calculateConfigForFile(file)
  const sorted = cloneWithSortedKeys(config)

  sorted.parser = "[PATH]"
  sorted.parserOptions.project = "[PATH]"
  sorted.parserOptions.tsconfigRootDir = "[PATH]"

  return sorted
}

async function runOnFile(fileName: string) {
  const linter = new ESLint({
    useEslintrc: false,
    ignore: false,
    overrideConfigFile: "dist/index.js"
  })

  const results = await linter.lintFiles([ fileName ])
  // eslint-disable-next-line no-param-reassign
  results.forEach((result) => {
    result.filePath = "[PATH]"
  })
  return results[0]
}

test("Full JS/TS configuration result", async () => {
  const linter = new ESLint({
    useEslintrc: false,
    overrideConfigFile: "dist/index.js"
  })

  const tsConfig = await extractConfig(linter, "src/index.ts")
  expect(JSON.stringify(tsConfig, null, 2)).toMatchSnapshot()

  const jsConfig = await extractConfig(linter, "src/index.js")
  expect(JSON.stringify(jsConfig, null, 2)).toMatchSnapshot()

  const tsRules = tsConfig.rules
  const jsRules = jsConfig.rules

  const ruleNames = Object.keys(tsRules)
  const configDiff: Diff[] = []

  ruleNames.forEach((ruleName) => {
    const tsValue = JSON.stringify(tsRules[ruleName], null, 2)
    const jsValue = JSON.stringify(jsRules[ruleName], null, 2)

    if (tsValue !== jsValue) {
      configDiff.push({ ruleName, tsValue, jsValue })
    }
  })

  expect(configDiff).toMatchSnapshot()
})

test("load config in eslint to validate all rule syntax is correct", async () => {
  expect(await runOnFile("./src/fixtures/test1.ts")).toMatchSnapshot()
})

test("reports undeclared variable", async () => {
  expect(await runOnFile("./src/fixtures/test2.ts")).toMatchSnapshot()
})
