var path = require('path');
var config = require('../config/config');

module.exports = function(app){
    app.all('/', handler);
    app.all('/:page', handler);
    app.all('/:dir/:page', handler);
}
var handler = function(req, res, next) {
    var dir = req.params.dir ? req.params.dir : '';
    var page = req.params.page ? req.params.page.replace('.html','') : 'index';
    var controller;

    try {
        if(dir === '')
            controller = require(path.join(config.controllerDir, page));
        else
            controller = require(path.join(config.controllerDir, dir, page));

        controller(req, res, page, dir);
    } catch(e) {
        console.log(e);
        res.send('error');
    }
};
