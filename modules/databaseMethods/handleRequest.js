let Log = require('../Log.js');

let logger = new Log();

const handleRequest = (request, callBack, Request, geocoder) => {
    request.session.dogs = 'dogs';
    if(request.session.loggedIn) {
        let {
            address,
            city,
            zip,
            state,
            serviceRequest,
            price,
            country,
        } = request.body;

        let currentDate = new Date();

        let addressString = `${address} ${city}, ${state} ${zip} ${country}`;
        geocoder.find(addressString, (error, response) => {
            logger.log(error);

            let insert = {
                JSON_REQUEST: Buffer.from(JSON.stringify(serviceRequest)),
                CREATED: currentDate,
                STATE_OF_REQUEST: 'Not Processed',
                ADDRESS: address,
                CITY: city,
                ZIP: zip,
                STATE: state,
                PRICE: price,
                COUNTRY: country,
                LATITUDE: response[0].location.lat,
                LONGITUDE: response[0].location.lng,
            }

            Request.forge(insert)
                .save()
                .then((serviceRequestResponse) => {
                    return serviceRequestResponse.users().attach(request.session.userId);
                })
                .then(() => {
                    return callBack ({
                        success: true,
                    });
                })
                .catch((error) => {
                    logger.log(error);
                    return callBack ({
                        success: false,
                    });
                });
        });

    } else {
        return callBack ({
            success: false,
            message: 'Cannot Make Request When Not Logged In'
        });
    }
}

module.exports = handleRequest;
