import { CLIEngine } from "eslint"

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
