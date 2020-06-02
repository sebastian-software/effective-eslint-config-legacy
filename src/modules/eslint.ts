import recommended from "eslint/conf/eslint-recommended"

import { ESLintRules } from "../types"
import { filterWithBlacklist } from "../util"

// From eslint recommended and not yet alternatively implemented in TS preset
export const eslint: ESLintRules = filterWithBlacklist(recommended.rules)
