export default {
  files: 'docs/**/*.{md,mdx}',
  dest: './dist-docs',
  menu: [
    'Introduction',
    'Getting Started',
    { name: 'Animations', menu: ['Slide', 'Push'] },
    { name: 'API', menu: ['MenuProvider', 'MenuContext'] },
    { name: 'Examples', menu: ['Usage with React Router'] }
  ]
};
