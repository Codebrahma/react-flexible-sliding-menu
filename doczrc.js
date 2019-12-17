export default {
  files: 'docs/*',
  dest: './dist-docs',
  menu: [
    'Introduction',
    'Getting Started',
    { name: 'Examples', menu: ['Basic'] },
    { name: 'API', menu: ['MenuProvider', 'openMenu'] }
  ]
};
