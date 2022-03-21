module.exports = {
    root: true,
    extends: ['react-app', 'prettier'],
    plugins: ['react-app', 'prettier'],
    rules: {
        'prettier/prettier': [
            'warn',
            {
                arrowParens: 'avoid',
                semi: false,
                trailingComma: 'none',
                endOfLine: 'lf',
                useTabs: false,
                singleQuote: true,
                printWidth: 120,
                jsxSingleQuote: false,
                bracketSpacing: false,
                jsxBracketSameLine: true
            }
        ]
    }
}
