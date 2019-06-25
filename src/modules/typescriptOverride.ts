import allTSRulesUnfiltered from "@typescript-eslint/eslint-plugin/dist/configs/all.json"

import { ESLintRules } from "../types"

const disabledByTS = Object.keys(allTSRulesUnfiltered.rules).filter(
  (name): boolean => !name.startsWith("@typescript-eslint/")
)

export const typescriptOverride: ESLintRules = {
  // These are generally a good idea but do not work well with TypeScript usage
  "import/export": "off",

  // Conflicts with TypeScript import/export e.g. interfaces
  "import/named": "off"
}

disabledByTS.forEach((name): void => {
  typescriptOverride[name] = "off"
})
