module.exports = {
    issuer: 'https://dev-890466.oktapreview.com/oauth2/default',
    aud: 'api://default',
    cid: '0oaft0pv7fvg40KzG0h7',
    generatePolicy: (effect, arn) => {
        return {
            principalId: 'user',
            policyDocument: {
                Version: '2012-10-17',
                Statement: [{
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: arn     
                }]
            },
        };
    }
};