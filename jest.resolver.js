// Via: https://github.com/typescript-eslint/typescript-eslint/issues/4210#issuecomment-981203332

// temporary workaround - https://github.com/facebook/jest/issues/9771#issuecomment-871585234
const resolver = require('enhanced-resolve').create.sync({
  conditionNames: ['require', 'node', 'default'],
  extensions: ['.js', '.json', '.node', '.ts', '.tsx'],
  mainFields: ['exports', 'main', 'require'],
});

/**
 * @param request {unknown}
 * @param options {{ defaultResolver(...args: unknown[]): unknown, basedir: unknown }}
 * @returns {unknown}
 */
module.exports = function (request, options) {
  // list global module that must be resolved by defaultResolver here
  if (['fs', 'http', 'path'].includes(request)) {
    return options.defaultResolver(request, options);
  }

  if (request === "eslint/conf/eslint-recommended") {
    return options.defaultResolver(request, options);
  }

  return resolver(options.basedir, request)
};
