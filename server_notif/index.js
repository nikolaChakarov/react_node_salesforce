// https://www.youtube.com/watch?v=v1KEcxDzJm8
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

// require jsforce to authenticate with salesforce;
const jsforce = require('jsforce');

const options = {
    loginUrl: process.env.URL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
};

const oauth = new jsforce.OAuth2(options);
const PORT = process.env.PORT || 9000;

oauth.authenticate(
    process.env.USER_NAME,
    process.env.PASSWORD,
    function (error, response) {}
);
