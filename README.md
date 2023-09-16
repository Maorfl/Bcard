# Bcard

Welcome to Bcard, your premier destination for high-quality, customized business cards that make lasting impressions.
Here you can make your own business cards and see others cards.

## Project Overview

The site provides you business cards of other people and businesses. You can like the ones you want and save them as favorites.
You can check the details of each business card that you want and also check it's owner's details.
If you signed up as business user, you can make your own business cards and if needed also edit or remove them.
Regular user can only see the cards that are made by business users and see their details.
If you signed in you can see your profile details and edit them.
In the Home page you can only see the cards that is not yours. If you want to see your own cards, you can see the under the My Cards tag.
The site is supported with Darkmode.

### Users to test functionality
Admin - Email: admin@test.com, Password: Admin12!
Business - Email: business@test.com, Password: Business1!
Regular - Email: regular@test.com, Password: Regular1!

## Installation

### .env
## bcard_client
    REACT_APP_API="http://localhost:7000/api"

## bcard_server
    NODE_ENV = development
    PORT = 7000
    DB = "mongodb+srv://maorfl:M0301f1644@maor-cluster.yi54khe.mongodb.net/business" # Atlas
    # Local: DB = "mongodb://127.0.0.1:27017/business" 
    jwtKey = "business"

### node_modules
## bcard_server  
    cd bcard_server
    npm install

## bcard_client  
    cd bcard_client
    npm install --force    

### Project activation
## Server
cd bcard_server
nodemon index.js

## App
cd bcard_client
npm start

```bash
$ git clone https://github.com/Maorfl/bcard.git
