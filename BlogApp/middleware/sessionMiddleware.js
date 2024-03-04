const session = require('express-session');
const cookieParser = require('cookie-parser');

const sessionMiddleware = session({
    secret: 'aZv!@#d',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 3600000 
    }
});

module.exports = sessionMiddleware;


