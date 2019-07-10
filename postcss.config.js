module.exports = {
    plugins: [
        require('postcss-inline-svg')({
         removeFill: false
        }),
        require('postcss-pxtorem')({
                rootValue: 100,
        }),
        require('autoprefixer')({browsers: ['last 15 versions']})
    ]
};