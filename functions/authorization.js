const config = require('../config.js');
const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: config.issuer,
    assertClaims: {
        aud: config.aud,
        cid: config.cid
    }
});

module.exports.auth = (event, context, callback) => {
    oktaJwtVerifier.verifyAccessToken(event.authorizationToken)
        .then(() => {
            callback(null, config.generatePolicy('Allow', event.methodArn));
        })
        .catch((err) => { 
            if (err.denied){
                callback(null, config.generatePolicy('Deny', event.methodArn));
            } else {
                callback('Unauthorized');
            }         
        });      
};
