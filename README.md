# yoyo
Uses the Twitter API to automatically change your Twitter profile picture on a schedule (e.g. every hour).

## Prerequisites

- **Node.js installed on your system**. Node.js runs on many platforms. If you do not have it installed, you can Google `How to install Node.js on X` where `X` is your platform (Ubuntu, Windows, etc)

- **Twitter API credentials for your account**. If you do not have API credentials for your account, you can follow the instructions here: https://iglvzx.wordpress.com/2015/08/23/generating-twitter-api-credentials/

## Setup instructions

- **Copy all the source code to your system**. You can clone using Git, or by downloding and extracting the source .ZIP file: https://github.com/iglvzx/yoyo/archive/master.zip

- **Create a file called `credentials.js`** in the main source folder. Then enter and save the following content, while filling in your corresponding API credentials in place of each `REPLACE_ME`:

<pre>
exports.credentials = {
    consumer_key: 'REPLACE_ME',
    consumer_secret: 'REPLACE_ME',
    access_token: 'REPLACE_ME',
    access_token_secret: 'REPLACE_ME'
};
</pre>

- **Create a folder called `images`** in the main source folder. Put all the .JPG, .JPEG, .PNG, and/or .GIF files you want the script to use in that folder.

- The structure of the yoyo source code should now look like this:

<pre>
images/
    image1.png
    image2.png
    image3.png
    ...
node_modules/
credentials.js
yoyo.js
</pre>

## Running the script

You should now be able to run the script by simply running the following command when inside the main source code folder:

`node yoyo.js`

The script will start automatically changing your profile picture to a randomly selected image in the `images` folder ever hour. If you want to have your profile change at different intervals, you can edit the following line in the `yoyo.js` file:

`var cronTime = '0 * * * *';`

For example you can change it to the following, to have it run every 20 minutes:

`var cronTime = '*/20 * * * *';`

This uses the **Cron** time format to set how often or when your profile picture will be changed. More information here: https://en.wikipedia.org/wiki/Cron

## Example Usage

I run yoyo on my Ubuntu server and I utilize the `screen` command to keep yoyo running in the background.

* `screen -S yoyo` to create a new session for yoyo.
* `cd yoyo` to nagivate to the yoyo folder.
* `node yoyo.js` to start yoyo

Then I can press `CTRL + A + D` to detach the yoyo session and leave the script running.

If I want to check the yoyo session again, I can attach it by running `screen -r yoyo`.
