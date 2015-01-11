// # Users API
// RESTful API for the User resource
var Promise         = require('bluebird'),
    _               = require('lodash'),
    dataProvider    = require('../models'),
    settings        = require('./settings'),
    canThis         = require('../permissions').canThis,
    errors          = require('../errors'),
    utils           = require('./utils'),
    globalUtils     = require('../utils'),
    config          = require('../config'),
    mail            = require('./mail'),

    docName         = 'users',
    // TODO: implement created_by, updated_by
    allowedIncludes = ['permissions', 'roles', 'roles.permissions'],
    users,
    sendInviteEmail;

// ## Helpers
function prepareInclude(include) {
    include = include || '';
    include = _.intersection(include.split(','), allowedIncludes);
    return include;
}

/**
 * ## Artists API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */
artists = {

    /**
     * ## Browse
     * Fetch all artists
     * @param {{context}} options (optional)
     * @returns {Promise(Users)} Users Collection
     */
    browse: function browse(options) {
        options = options || {};
        options.is_artist = true;
        if (options.include) {
          options.include = prepareInclude(options.include);
        }
        return dataProvider.User.findPage(options);
    }
};

module.exports = artists;
