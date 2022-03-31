var shippo = require('shippo')('shippo_test_5df10c0c144011a7d039c65239a0c93830d99a28');

module.exports = function (addressTo:object) {
    var addressFrom = {

        "name": "Shawn Ippotle",

        "street1": "215 Clayton St.",

        "city": "San Francisco",

        "state": "CA",

        "zip": "94117",

        "country": "US"

    };


    /*
    var addressTo = {

        "name": "Mr Hippo",

        "street1": "Broadway 1",

        "city": "New York",

        "state": "NY",

        "zip": "10007",

        "country": "US"

    };
    */

    /*
    var addressTo = {

        "name": "Mr Hippo",

        "street1": "Santa Fe Dr 1",

        "city": "Denver",

        "state": "CO",

        "zip": "80223",

        "country": "US"

    };
    */

    /*
    var addressTo = {

        "name": "Mr Hippo",

        "street1": "Gonzalez besada",

        "city": "Oviedo",

        "zip": "33007",

        "country": "ESP"

    };

     */


    var parcel = {

        "length": "5",

        "width": "5",

        "height": "5",

        "distance_unit": "in",

        "weight": "2",

        "mass_unit": "lb"

    };


    shippo.shipment.create({

        "address_from": addressFrom,

        "address_to": addressTo,

        "parcels": [parcel],

        "async": false

    }, function (err: any, shipment: { rates: { amount: Object; }[]; }) {

        console.log(shipment.rates[0].amount);

    });
}