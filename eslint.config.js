import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { ESLint } from 'eslint';

export default {
    extends: [
        js.configs.recommended,
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
    ],
    overrides: [
        {
            files: ['**/*.{ts,tsx}'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            plugins: [
                'react',
                'react-hooks',
                'react-refresh',
                '@typescript-eslint',
            ],
            rules: {
                ...reactHooks.configs.recommended.rules,
                'react-refresh/only-export-components': [
                    'warn',
                    { allowConstantExport: true },
                ],
                // You can add more custom rules here
            },
        },
    ],
    languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
    },
    ignorePatterns: ['dist'],  // Add the "dist" folder to the ignore list
};
