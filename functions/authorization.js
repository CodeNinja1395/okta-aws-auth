const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-890466.oktapreview.com/oauth2/default',
    assertClaims: {
      aud: 'api://default'
    }
});

module.exports.auth = (event, context, callback) => {
    oktaJwtVerifier.verifyAccessToken(event.authorizationToken)
        .then(() => {
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
            callback('Unauthorized');
        });      
};
