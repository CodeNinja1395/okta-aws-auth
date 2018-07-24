'use strict';
//00cptm6-PlVajy08BE6fDC1dgvDEqAj-ftiPdt_-FE
const OktaJwtVerifier = require('@okta/jwt-verifier');

module.exports.hello = (event, context, callback) => {
    const oktaJwtVerifier = new OktaJwtVerifier({
        issuer: 'https://dev-890466.oktapreview.com/oauth2/default'
    });

    console.log(event.headers.token);
    
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless v1.0! Your function executed successfully!',
        })
    };
    oktaJwtVerifier.verifyAccessToken(event.headers.token)
        .then((jwt) => {
            callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                  message: jwt,
              })
          });
        })
        .catch((err) => {
            callback(null, {
              statusCode: 200,
              body: JSON.stringify({
                  message: err,
              })
          }); 
        }); 

    
    
};
