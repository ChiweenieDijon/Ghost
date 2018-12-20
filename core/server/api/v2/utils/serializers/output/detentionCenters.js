const debug = require('ghost-ignition').debug('api:v2:utils:serializers:output:detentionCenters');
const mapper = require('./utils/mapper');

module.exports = {
    all(models, apiConfig, frame) {
    	
        debug('all');

        if (!models) {
            return;
        }

        if (models.meta) {
            frame.response = {
                detentionCenters: models.data.map(model => mapper.mapTag(model, frame)),
                meta: models.meta
            };

            return;
        }

        frame.response = {
            detentionCenters: [mapper.mapTag(models, frame)]
        };

        debug(frame.response);
    }
};
