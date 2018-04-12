let faker = require('faker');
let crypto = require('crypto');
let config = require('../config.json');

function generateSearchRequest() {
    return {
        'body': {
            'max': 3,
            'address': '800-820 E 15th St N',
            'city': 'Newton',
            'state': 'Iowa',
            'zip': 50314,
            'country': 'United States',
        },
        'session': {
            'loggedIn': true,
            'userId': 1,
        },
    };
}

function generateFakeUserRequest() {
    let fakePass = faker.internet.password();
    return {
        'body': {
            'password': encrypt(fakePass),
            'email': faker.internet.email(),
            'username': faker.internet.userName(),
            'address': faker.address.streetAddress(),
            'state': faker.address.state(),
            'zip': faker.address.zipCode(),
            'city': faker.address.city(),
            'country': faker.address.country(),
        },
        'session': {
            'loggedIn': false,
        },
        'realPass': fakePass,
    };
}

function generateFakeServiceRequest() {
    return {
        'body': {
            'serviceRequest': {
                'lawnCare': {
                    'height': faker.random.number(),
                    'pattern': "stripe",
                    'fertilize': false,
                    'water': false,
                    'seeds': false,
                    'removeWeeds': false,
                    'misc': "",
                }
            },
            'address': "1902 Crocker Street",
            'state': "Iowa",
            'zip': 50314,
            'city': "Des Moines",
            'price': faker.random.number(),
            'country': "United States",
        },
        'session': {
            'loggedIn': true,
            'userId': 1,
        },
    }
}

function generateFakeServiceRequest1() {
    return {
        'body': {
            'serviceRequest': {
                'lawnCare': {
                    'height': faker.random.number(),
                    'pattern': "stripe",
                    'fertilize': false,
                    'water': false,
                    'seeds': false,
                    'removeWeeds': false,
                    'misc': "",
                }
            },
            'address': "201 E 17th St N",
            'state': "Iowa",
            'zip': 50208,
            'city': "Newton",
            'price': faker.random.number(),
            'country': "United States",
        },
        'session': {
            'loggedIn': true,
            'userId': 1,
        },
    }
}

function generateFakeServiceRequest2() {
    return {
        'body': {
            'serviceRequest': {
                'lawnCare': {
                    'height': faker.random.number(),
                    'pattern': "stripe",
                    'fertilize': false,
                    'water': false,
                    'seeds': false,
                    'removeWeeds': false,
                    'misc': "",
                }
            },
            'address': "801-1099 W 2nd St S",
            'state': "Iowa",
            'zip': 50208,
            'city': "Newton",
            'price': faker.random.number(),
            'country': "United States",
        },
        'session': {
            'loggedIn': true,
            'userId': 1,
        },
    }
}

function generateFakeServiceRequest3() {
    return {
        'body': {
            'serviceRequest': {
                'lawnCare': {
                    'height': faker.random.number(),
                    'pattern': "stripe",
                    'fertilize': false,
                    'water': false,
                    'seeds': false,
                    'removeWeeds': false,
                    'misc': "",
                }
            },
            'address': "2728-2798 S 12th Ave W",
            'state': "Iowa",
            'zip': 50208,
            'city': "Newton",
            'price': faker.random.number(),
            'country': "United States",
        },
        'session': {
            'loggedIn': true,
            'userId': 1,
        },
    }
}

function encrypt(password) {
    let cipher = crypto.createCipher(config.client_side_encryption.algorithm,
            config.client_side_encryption.password);
    let crypted = cipher.update(password, 'utf-8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
}

module.exports = {
    'generateSearchRequest': generateSearchRequest,
    'generateFakeUserRequest': generateFakeUserRequest,
    'generateFakeServiceRequest': generateFakeServiceRequest,
    'generateFakeServiceRequest1': generateFakeServiceRequest1,
    'generateFakeServiceRequest2': generateFakeServiceRequest2,
    'generateFakeServiceRequest3': generateFakeServiceRequest3,
};
