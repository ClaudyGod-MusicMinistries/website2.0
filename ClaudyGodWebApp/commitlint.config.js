/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // new feature
        'fix',      // bug fix
        'docs',     // documentation only
        'style',    // formatting, missing semicolons, etc.
        'refactor', // code change that is neither fix nor feature
        'perf',     // performance improvement
        'test',     // adding or updating tests
        'build',    // changes to build system or dependencies
        'ci',       // CI configuration
        'chore',    // other changes (e.g. releases)
        'revert',   // revert a previous commit
      ],
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 200],
  },
};
