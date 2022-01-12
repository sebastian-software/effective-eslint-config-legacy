import recommended from "eslint/conf/eslint-recommended"
import { Linter } from "eslint"


// From eslint recommended and not yet alternatively implemented in TS preset
export const eslint: Linter.RulesRecord = recommended.rules
