export default {
  files: ['docs/**/*.{md,mdx}', 'CONTRIBUTING.md'],
  dest: './dist-docs',
  public: './docs/public',
  menu: [
    'Introduction',
    'Getting Started',
    { name: 'Animations', menu: ['Slide', 'Push'] },
    { name: 'API', menu: ['MenuProvider', 'MenuContext'] },
    { name: 'Examples', menu: ['Usage with React Router'] },
    'Contributing'
  ]
};
