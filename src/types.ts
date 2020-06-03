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

export interface Json {
  [x: string]: string|number|boolean|Date|Json|JsonArray
}

export type JsonArray = Array<string|number|boolean|Date|Json|JsonArray>
