const Promise = require('bluebird');
const common = require('../../lib/common');
const models = require('../../models');
const ALLOWED_INCLUDES = ['count.posts'];

module.exports = {
    docName: 'detentionCenters',

    browse: {
        options: [
            'include',
            'filter',
            'fields',
            'limit',
            'order',
            'page',
            'debug'
        ],
        // validation: {
        //     options: {
        //         include: {
        //             values: ALLOWED_INCLUDES
        //         }
        //     }
        // },
        permissions: false,
        query(frame) {
            const ret = models.DetentionCenter.findPage(frame.options);
            return ret;
        }
    },

    read: {
        options: [
            'include',
            'filter',
            'fields',
            'debug'
        ],
        data: [
            'id'
        ],
        validation: {
            options: {
                include: {
                    values: ALLOWED_INCLUDES
                }
            }
        },
        permissions: false,
        query(frame) {
            return models.DetentionCenter.findOne(frame.data, frame.options)
                .then((model) => {
                    if (!model) {
                        return Promise.reject(new common.errors.NotFoundError({
                            message: common.i18n.t('errors.api.tags.tagNotFound')
                        }));
                    }

                    return model;
                });
        }
    }
};
