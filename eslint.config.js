import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'
import configPrettier from 'eslint-config-prettier'
import pluginPrettier from 'eslint-plugin-prettier'
import * as parserTypeScript from '@typescript-eslint/parser'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'

export default [
  {
    ...js.configs.recommended,
    ignores: ['dist/**', 'node_modules/**']
  },
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue', '**/*.js', '**/*.ts'],
    plugins: {
      '@typescript-eslint': pluginTypeScript,
      prettier: pluginPrettier
    },
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        ecmaVersion: 2022,
        sourceType: 'module'
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        alert: 'readonly',
        confirm: 'readonly',
        prompt: 'readonly',

        // Web APIs
        fetch: 'readonly',
        FormData: 'readonly',
        FileReader: 'readonly',
        File: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
        URLSearchParams: 'readonly',
        Event: 'readonly',
        HTMLElement: 'readonly',

        // Encoding/decoding
        atob: 'readonly',
        btoa: 'readonly'
      }
    },
    rules: {
      ...configPrettier.rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off'
    }
  }
]
