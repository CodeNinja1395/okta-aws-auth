1. We should send request to our auth server at okta via this link (by browser): 

        https://dev-890466.oktapreview.com/oauth2/default/v1/authorize?client_id=0oaft0pv7fvg40KzG0h7&response_type=code&scope=openid&redirect_uri=https://uvx9np4dxh.execute-api.us-east-1.amazonaws.com/dev/&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601
2. If you need login to my console: log: Heyapple1395@gmail.com, pass: Plastic1908bag. It will give us a authentication code (valid for 60 seconds) and redirect us to our lambda function page with link looks like this :

        https://uvx9np4dxh.execute-api.us-east-1.amazonaws.com/dev/?code=1eJQZawh7QiwDu9mugea&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601%27

3.	Then we should form POST request via postman with those params:


    Uri: https://dev-890466.oktapreview.com/oauth2/default/v1/token 
    
    Headers: {
    	Accept: application/json
    Authorization: Basic MG9hZnQwcHY3ZnZnNDBLekcwaDc6M0RyekRFZjgxVUlkbC0zOWQ1OEMtdEk4SUtiWjF5S2lBcEZkblN4Qw== (this is secret info provided by okta auth server)
    	Content-Type: application/x-www-form-urlencoded
    }
    
    Body: {
    	grant_type: authorization_code
    	code: <your code from url(available for 60 sec)>
    	redirect_uri: https://uvx9np4dxh.execute-api.us-east-1.amazonaws.com/dev/
    		
    }

Finally we will receive access token which we can send via GET request  to our endpoint: 


    https://uvx9np4dxh.execute-api.us-east-1.amazonaws.com/dev/ 
with header ‘token’ : 'your access token'. We will receive decoded info about this token.

P.S. Usually, those steps made by front-end side of the application, but because we dont have any, we should do it like this.
P.P.S. I registered test developer server on my personal email, if it`s important, I can make another instance with lambda-email
