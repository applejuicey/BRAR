const scheme = require('./scheme');

module.exports = function (app) {
    // routes
    app.use('/api/scheme', scheme);
};