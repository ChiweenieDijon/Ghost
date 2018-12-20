const ghostBookshelf = require('./base'),
    urlService = require('../services/url'),
    {urlFor} = require('../services/url/utils');
let DetentionCenter, DetentionCenters;

DetentionCenter = ghostBookshelf.Model.extend({

    tableName: 'detention_centers'

/*
    posts: function posts() {
        return this.belongsToMany('Post');
    }*/

}, {
    orderDefaultOptions: function orderDefaultOptions() {
        return {};
    },

    /**
     * @deprecated in favour of filter
     */
    processOptions: function processOptions(options) {
        return options;
    },

    permittedOptions: function permittedOptions(methodName) {
        var options = ghostBookshelf.Model.permittedOptions.call(this, methodName),

            // whitelists for the `options` hash argument on methods, by method name.
            // these are the only options that can be passed to Bookshelf / Knex.
            validOptions = {
                findPage: ['page', 'limit', 'columns', 'filter', 'order', 'absolute_urls'],
                findAll: ['columns'],
                findOne: ['visibility'],
                destroy: ['destroyAll']
            };

        if (validOptions[methodName]) {
            options = options.concat(validOptions[methodName]);
        }

        return options;
    }
});

DetentionCenters = ghostBookshelf.Collection.extend({
    model: DetentionCenter
});

module.exports = {
    DetentionCenter: ghostBookshelf.model('DetentionCenter', DetentionCenter),
    DetentionCenters: ghostBookshelf.collection('DetentionCenters', DetentionCenters)
};
