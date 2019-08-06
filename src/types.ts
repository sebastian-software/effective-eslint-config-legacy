import { Linter } from "eslint"

export interface ESLintRules {
  [name: string]: Linter.RuleLevel | Linter.RuleLevelAndOptions
}

export interface ESLintEnv {
  [name: string]: boolean
}

export interface ESLintOverrides {
  files: string[]
  rules?: ESLintRules
  env?: ESLintEnv
}

export interface ESLintConfig extends Linter.Config {
  root: boolean
  plugins: string[]
  extends: string[]
  overrides: ESLintOverrides[]
}
