# yoyo
Uses the Twitter API to automatically change your Twitter profile picture on a schedule (e.g. every hour).

## Prerequisites

1. **Node.js installed on your system**. Node.js runs on many platforms, so you do not have it installed, you can Google `How to install Node.js on X` where `X` is your platform (Ubuntu, Windows, etc)

2. **Twitter API credentials for your account**. If you do not have API credentials for your account, you can follow the instructions here: https://dev.twitter.com/oauth/overview/application-owner-access-tokens

## Setup instructions

1. **Copy all the source code to your system**. You can clone using Git, or by downloding and extracting the source .ZIP file: https://github.com/iglvzx/yoyo/archive/master.zip

2. **Create a file called `credentials.js`** in the main source folder. Then enter and save the following content, while filling in your corresponding API credentials in place of each `REPLACE_ME`:

<pre>
exports.credentials = {
    consumer_key: 'REPLACE_ME',
    consumer_secret: 'REPLACE_ME',
    access_token: 'REPLACE_ME',
    access_token_secret: 'REPLACE_ME'
};
</pre>

3. **Create a folder called `images`** in the main source folder. Put all the .JPG, .JPEG, .PNG, and/or .GIF files you want the script to use in that folder...
