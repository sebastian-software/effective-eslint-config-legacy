module.exports = {
  presets: [
    [ "@babel/env", { targets: { node: 8 } }],
    [ "@babel/preset-typescript", { isTSX: true, allExtensions: true }]
  ]
}
