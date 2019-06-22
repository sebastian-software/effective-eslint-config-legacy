import { CLIEngine } from "eslint"
import { escapeRegExp } from "lodash"
import diff from "diff-lines"

const CWD_REPL = escapeRegExp(process.cwd())

function extractConfig(cli: CLIEngine, file: string) {
  const result = JSON.stringify(cli.getConfigForFile(file), null, "  ")
  return result.replace(new RegExp(CWD_REPL), "[CWD]")
}

test("load config in eslint to validate all rule syntax is correct", () => {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  const code = "const first = 1\nfunction second() {}\nsecond(first)\n"
  const result = cli.executeOnText(code)

  expect(result).toMatchSnapshot()
})

test("configuration result matches for JS", () => {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  expect(extractConfig(cli, "src/index.js")).toMatchSnapshot()
})

test("configuration result matches for TS", () => {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  expect(extractConfig(cli, "src/index.ts")).toMatchSnapshot()
})

test("configuration result for JS and TS differs", () => {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  const jsConfig = extractConfig(cli, "src/index.js")
  const tsConfig = extractConfig(cli, "src/index.ts")

  // eslint-disable-next-line @typescript-eslint/camelcase
  expect(diff(jsConfig, tsConfig, { n_surrounding: 0 })).toMatchSnapshot()
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
