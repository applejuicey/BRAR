const scheme = require('./scheme');
const subject = require('./subject');

module.exports = function (app) {
    // routes
    app.use('/api/scheme', scheme);
    app.use('/api/subject', subject);
};