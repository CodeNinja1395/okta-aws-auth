1. You need to send a request to  auth server at okta via this link (by browser). 
https://dev-890466.oktapreview.com/oauth2/default/v1/authorize?
client_id=0oaft0pv7fvg40KzG0h7&
response_type=code&scope=openid&
redirect_uri=https://a4gzrnox4a.execute-api.us-east-1.amazonaws.com/dev/auth&
state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
    Auth server will ask you for login and password 
 -Login: Heyapple1395@gmail.com, 
 -Pass: Plastic1908bag 
    
2.  It will give you an authentication code (valid for 60 seconds) and redirect you to  lambda function page with link that looks like this. You will need to copy a code from this link(1eJQZawh7QiwDu9mugea in this example):

        https://uvx9np4dxh.execute-api.us-east-1.amazonaws.com/dev/?code=1eJQZawh7QiwDu9mugea&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601%27

3.	Then you should form POST request via postman with those params. Body params should be placed in x-www-form-urlencoded section in postman body section:

        Uri: https://dev-890466.oktapreview.com/oauth2/default/v1/token 
        
        Headers: {
        	Accept: application/json
            Authorization: Basic MG9hZnQwcHY3ZnZnNDBLekcwaDc6M0RyekRFZjgxVUlkbC0zOWQ1OEMtdEk4SUtiWjF5S2lBcEZkblN4Qw==
        	Content-Type: application/x-www-form-urlencoded
        }
        
        Body: {
        	grant_type: authorization_code
        	code: <your code from url(available for 60 sec)>
        	redirect_uri: https://a4gzrnox4a.execute-api.us-east-1.amazonaws.com/dev/auth
        		
        }

4. Finally you will receive access token which you can send via GET request to lambda endpoint with header ‘token’ : 'your access token'. You will receive decoded info about this token. 
Lambda endpoint to send GET request:

    https://a4gzrnox4a.execute-api.us-east-1.amazonaws.com/dev/ 



P.S. Usually, those steps made by front-end side of the application, but because we dont have any, we should do it like this.

