'use strict';
// https://dev-890466.oktapreview.com/oauth2/default/v1/authorize?
// client_id=0oaft0pv7fvg40KzG0h7&
// response_type=code&scope=openid&
// redirect_uri=https://uvx9np4dxh.execute-api.us-east-1.amazonaws.com/dev/&
// state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601'

const OktaJwtVerifier = require('@okta/jwt-verifier');
const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: 'https://dev-890466.oktapreview.com/oauth2/default',
    assertClaims: {
      aud: 'api://default'
    }
  });
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');


module.exports.hello = (event, context, callback) => {   
    // let params = {
    //     method: 'POST',    
    //     headers: {
    //         'Accept': 'application/json',
    //         'Authorization' : 'Basic MG9hZnQwcHY3ZnZnNDBLekcwaDc6M0RyekRFZjgxVUlkbC0zOWQ1OEMtdEk4SUtiWjF5S2lBcEZkblN4Qw==',
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },  
    //     body: JSON.stringify({
    //         grant_type: 'authorization_code',
    //         code: event.queryStringParameters.code,
    //         redirect_uri: 'https://uvx9np4dxh.execute-api.us-east-1.amazonaws.com/dev/'
    //     }),       
    // };

    // fetch('https://dev-890466.oktapreview.com/oauth2/default/v1/token', params)
    //     .then((res) => {
    //         return res.json();      
    //     })
    //     .then(json => {
    //         console.log(json);          
    //     })
    //     .catch((err) => {
    //         console.log(err);         
    //     })  
    oktaJwtVerifier.verifyAccessToken(event.headers.token)
        .then((jwt) => {
            callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: jwt,
                result: 'success'
            })
        });
        })
        .catch((err) => {
            callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: err,
                result: 'error'
            })
        }); 
        }); 
};
module.exports.auth = (event, context, callback) => {

    // oktaJwtVerifier.verifyAccessToken(event.headers.Authorization)
    //     .then((jwt) => {
    //         callback(null, {
    //           statusCode: 200,
    //           body: JSON.stringify({
    //               message: jwt,
    //           })
    //       });
    //     })
    //     .catch((err) => {
    //         callback(null, {
    //           statusCode: 200,
    //           body: JSON.stringify({
    //               message: err,
    //           })
    //       }); 
    //     }); 
 
};
