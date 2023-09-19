# Bcard

Welcome to Bcard, your premier destination for high-quality, customized business cards that make lasting impressions.
Here you can make your own business cards and see others cards.

# Project Overview

The site provides you business cards of businesses. You can like the ones you want and save them as favorites.
You can check the details of each business card that you want and also check it's owner's details.
If you signed up as business user, you can make your own business cards and if needed also edit or remove them.
Regular user can only see and check cards.
If you signed in you can see your profile details and edit it.
In the Home page you can only see the cards that is not yours. If you want to see your own cards, you can see the under the My Cards tag.
Failure in signing in 3 times will suspend your account for 24 hours, except Admins.
As Admin you can see all users, change their user-types, delete users and ban users. Also you are in control of deleting and changing Biz-Number of others users cards.
The site is supported with Darkmode.

The server side will create log-files of each date where an error 400 and above will appear. 

## Users to test functionality
Admin - Email: admin@test.com, Password: Admin12!
Business - Email: business@test.com, Password: Business1!
Regular - Email: regular@test.com, Password: Regular1!

There are 3 cards saved to test functionality, 2 of the Business user and 1 of the Admin user.

# Installation

## .env - Must be added independently in both folders
### bcard_client
    REACT_APP_API="http://localhost:7000/api"

### bcard_server
    NODE_ENV = development
    PORT = 7000
    DB = "mongodb+srv://maorfl:M0301f1644@maor-cluster.yi54khe.mongodb.net/business" # Atlas
    # Local: DB = "mongodb://127.0.0.1:27017/business" 
    jwtKey = "business"

## node_modules
### bcard_server  
    cd bcard_server
    npm install

### bcard_client  
    cd bcard_client
    npm install --force    

## Project activation
### Server
    cd bcard_server
    nodemon index.js

### App
    cd bcard_client
    npm start

```bash
$ git clone https://github.com/Maorfl/bcard.git
