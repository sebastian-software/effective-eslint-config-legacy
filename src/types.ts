import { Linter } from "eslint"

export interface ESLintRules {
  [name: string]: Linter.RuleLevel | Linter.RuleLevelAndOptions
}

export interface ESLintEnv {
  [name: string]: boolean
}

export interface ESLintValues {
  [name: string]: boolean | number | string | string[] | ESLintValues
}

export interface ESLintOverrides {
  files: string[]
  extends?: string[]
  rules?: ESLintRules
  env?: ESLintEnv
}

export interface ESLintConfig extends Linter.Config {
  root: boolean
  plugins: string[]
  extends?: string[]
  overrides: ESLintOverrides[]
  env?: ESLintEnv
  settings?: ESLintValues
  parser?: string
  parserOptions?: ESLintValues
  rules?: ESLintRules
}
