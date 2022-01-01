process.env.NODE_ENV = 'development';

const configFactory = require('../webpack.config');
module.exports = configFactory('development');
