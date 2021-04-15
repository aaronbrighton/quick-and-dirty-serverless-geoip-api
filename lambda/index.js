const fs = require('fs');
const Reader = require('@maxmind/geoip2-node').Reader;

// Load the GeoIP database outside of the individual Lambda executions
const dbBuffer = fs.readFileSync('./GeoLite2-City.mmdb');
const reader = Reader.openBuffer(dbBuffer);
exports.handler = async function(event) {

    // Let's query the GeoIP DB with either the value of the "ip" query string parameter, or the requesters IP
    try {
        console.log(event)
        geoIPLookupResponse = reader.city(event.queryStringParameters ? event.queryStringParameters.ip : event.requestContext.http.sourceIp)

        // Return the result to the requestor
        return {
            statusCode: 200,
            body: JSON.stringify(geoIPLookupResponse)
        };

    } catch {

        // Error occurred, return an error
        return {
            statusCode: 500,
            body: JSON.stringify({error: 'An unknown error occurred while trying to resolve the IP.'})
        };

    }
};