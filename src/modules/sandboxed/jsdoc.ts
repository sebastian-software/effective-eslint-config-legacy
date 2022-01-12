import { Linter } from "eslint"

export const jsdoc: Linter.RulesRecord = {
  "jsdoc/check-alignment": "warn",
  "jsdoc/check-param-names": "error",
  "jsdoc/check-tag-names": "error",
  "jsdoc/newline-after-description": "warn",
  "jsdoc/no-types": "error",
  "jsdoc/require-param-description": "warn",
  "jsdoc/require-param-name": "warn",
  "jsdoc/require-returns-check": "warn",
  "jsdoc/require-returns-description": "warn"
}
