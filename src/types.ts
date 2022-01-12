import { Linter } from "eslint"

export interface ESLintEnv {
  [name: string]: boolean
}

export interface ESLintValues {
  [name: string]: boolean | number | string | string[] | ESLintValues
}

export interface ESLintOverrides {
  files: string[]
  extends?: string[]
  rules?: Linter.RulesRecord
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
  rules?: Linter.RulesRecord
}
