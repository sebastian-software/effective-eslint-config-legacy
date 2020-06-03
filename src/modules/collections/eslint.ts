import recommended from "eslint/conf/eslint-recommended"

import { ESLintRules } from "../../types"

// From eslint recommended and not yet alternatively implemented in TS preset
export const eslint: ESLintRules = recommended.rules
