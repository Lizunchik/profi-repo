const path = require('path');
module.exports = {
    entry: './src/components/index/index.js',
    output:{
        filename: 'main.js',
        path : path.resolve(__dirname, 'dist'),
        
    }
};