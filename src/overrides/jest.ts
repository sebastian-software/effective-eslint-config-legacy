    // Jest Test Runner
export const jestOverride = {
  files: [ "*.test.{js,jsx,ts,tsx}", "**/test/**/*.{js,jsx,ts,tsx}" ],
  extends: [ "plugin:jest/recommended" ],
  rules: {
    // Reduce config from recommended to warn for auto-fixable rules
    "jest/no-focused-tests": "warn",
    "jest/no-test-prefixes": "warn",
    "jest/no-deprecated-functions": "warn",
    "jest/no-jasmine-globals": "warn",
    "jest/valid-title": "warn",

    // Relax a few rules inside tests
    "filenames/match-exported": "off",
    "@typescript-eslint/no-magic-numbers": "off",
    "no-redeclare": "off",
    "func-names": "off",
    "react/display-name": "off",
    "jsx-a11y/click-events-have-key-events": "off"
  }
}
