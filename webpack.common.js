const path = require('path');

module.exports = {
    resolve: {
        alias: {
            Js: path.resolve(__dirname, 'src/js'),
            Scss: path.resolve(__dirname, 'src/scss'),
            Components: path.resolve(__dirname, 'src/components'),
            Services: path.resolve(__dirname, 'src/js/services'),
            Library: path.resolve(__dirname, 'src/js/lib'),
            Utility: path.resolve(__dirname, 'src/js/utility'),
            Vendor: path.resolve(__dirname, 'src/js/vendor'),
            Widgets: path.resolve(__dirname, 'src/widgets'),
            Header: path.resolve(__dirname, 'src/header'),
            Footer: path.resolve(__dirname, 'src/footer'),
            Assets: path.resolve(__dirname, 'src/assets'),
            Pug: path.resolve(__dirname, 'src/pug')
        },
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { babelrc: true },
                include: [
                    path.resolve(__dirname, 'src')
                ],
                exclude: [
                    /node_modules/,
                    /particles.js/
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                    }
                ]
            },
            {
                test: /\.pug$/,
                use:  ['pug-loader']
            },
        ]
    },
};
