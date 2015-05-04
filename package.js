Package.describe({
  name: 'chrisbutler:accounts-pivotal',
  version: '0.0.1',
  git: 'https://github.com/chrisbutler/meteor-accounts-pivotal',
  summary: 'Sign in with your Pivotal Tracker account.',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('0.9.0');
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-base', ['client', 'server']);
  api.use('http', ['server']);
  api.use('check');
  api.addFiles('accounts-pivotal.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('chrisbutler:accounts-pivotal');
  api.addFiles('accounts-pivotal-tests.js');
});
