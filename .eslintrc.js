// module.exports = {
//     root: true,
//     env: {
//         browser: true,
//         es2021: true,
//         node: true,
//     },
//     parser: '@typescript-eslint/parser',
//     parserOptions: {
//         ecmaVersion: 2021,
//         sourceType: 'module',
//         project: './tsconfig.json', // если вы используете rules, которые требуют type-aware linting
//     },
//     settings: {
//         'import/resolver': {
//             alias: {
//                 map: [
//                     ['@app', './src/app'],
//                     ['@shared', './src/shared'],
//                     ['@entities', './src/entities'],
//                     ['@features', './src/features'],
//                     ['@pages', './src/pages'],
//                     ['@widgets', './src/widgets'],
//                 ],
//                 extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
//             },
//         },
//     },
//     plugins: [
//         'import',
//         'react',
//         'react-hooks',
//         '@typescript-eslint',
//     ],
//     extends: [
//         'eslint:recommended',
//         'plugin:import/recommended',
//         'plugin:react/recommended',
//         'plugin:react-hooks/recommended',
//         'plugin:@typescript-eslint/recommended',
//         'prettier', // если вы используете Prettier
//     ],
//     rules: {
//         // Пример ваших правил: настройте по вкусу
//         'import/no-unresolved': 'error',
//         'import/extensions': ['error', 'ignorePackages', {
//             js: 'never',
//             jsx: 'never',
//             ts: 'never',
//             tsx: 'never',
//             vue: 'never'
//         }],
//         'react/react-in-jsx-scope': 'off',
//         'react/jsx-uses-react': 'off',
//         '@typescript-eslint/no-explicit-any': 'warn',
//         '@typescript-eslint/explicit-module-boundary-types': 'off',
//     },
//     ignorePatterns: ['dist/', 'build/', 'node_modules/'],
// };