let Log = require('../Log.js');

let logger = new Log();

const searchForRequests = (request, callBack, Request, geocoder) => {
    if (request.session.loggedIn) {
        let {
            max,
            address,
            city,
            state,
            zip,
            country,
        } = request.body;

        let addressString = address + " " + city + " , " + state + " " + zip + " " + country;

        geocoder.find(addressString, (error, response) => {

            Request.query((queryItem) => {
                queryItem.limit(max);
                queryItem.where('STATE_OF_REQUEST', 'Not Processed');
                queryItem.orderByRaw('SQRT(POW(' + response[0].location.lng + ' - LONGITUDE, 2) + POW(' + response[0].location.lat + '- LATITUDE , 2))');
            }).fetchAll().then((models) => {

                let listOfModels = [];

                models.forEach((model) => {
                    listOfModels.push({
                        'lawnCareDetails': model.get('JSON_REQUEST'),
                        'created': model.get('CREATED'),
                        'status': model.get('STATE_OF_REQUEST'),
                        'streetAddress': model.get('ADDRESS'),
                        'city': model.get('CITY'),
                        'zip': model.get('ZIP'),
                        'state': model.get('STATE'),
                        'price': model.get('PRICE'),
                        'latitude': model.get('LATITUDE'),
                        'longitude': model.get('LONGITUDE'),
                        'country': model.get('COUNTRY'),
                    });
                });

                return callBack({
                    success: true,
                    data: listOfModels,
                });
            });
        });

    } else {
        return callBack({
            success: false,
            message: 'Cannot search for request when not logged in.'
        });
    }
}

module.exports = searchForRequests;
