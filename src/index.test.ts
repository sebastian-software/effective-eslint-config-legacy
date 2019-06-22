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

test("Full configuration result", () => {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: "dist/index.js"
  })

  expect(extractConfig(cli, "src/index.js")).toMatchSnapshot()
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
