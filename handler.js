'use strict';
// https://dev-890466.oktapreview.com/oauth2/default/v1/authorize?
// client_id=0oaft0pv7fvg40KzG0h7&
// response_type=code&scope=openid&
// redirect_uri=https://a4gzrnox4a.execute-api.us-east-1.amazonaws.com/dev/auth&
// state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601'

const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-890466.oktapreview.com/oauth2/default',
    assertClaims: {
      aud: 'api://default'
    }
});

module.exports.auth = (event, context, callback) => {

    console.log(event);
    
    oktaJwtVerifier.verifyAccessToken(event.authorizationToken)
        .then((jwt) => {
            callback(null, {
                principalId: "user",
                policyDocument: {
                    Version: '2012-10-17',
                    Statement: [{
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: 'arn:aws:execute-api:us-east-1:810430796289:a4gzrnox4a/*/GET/',              
                    }]
                },
            });
        })
        .catch((err) => {
            console.log(err);          
            callback('Unauthorized');
        });      
};

module.exports.test = (event, context, callback) => {   
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'success'
        })
    }

    callback(null, response);
};

