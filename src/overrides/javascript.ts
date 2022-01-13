import { Linter } from "eslint";

// Pure JavaScript files
export const jsOverride: Linter.ConfigOverride = {
  // Definition files are typically really TS specific and
  // do not work in the same way as normal TS files.
  files: [ "*.js", "*.jsx" ],
  rules: {
    // related to the 'any' type which cannot be validated for these files anyway
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/restrict-template-expressions": "off"
  }
}
