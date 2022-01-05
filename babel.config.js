module.exports = {
    presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
        [
            '@babel/preset-typescript',
            {
                isTSX: true,
                allExtensions: true,
            },
        ],
    ],
    plugins: [
        process.env.NODE_ENV === 'development' && 'react-refresh/babel',
    ].filter(Boolean),
};
