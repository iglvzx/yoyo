var credentials = require('./credentials');

var fs = require('fs');
var schedule = require('node-schedule');
var Twit = require('twit');

var T = new Twit(credentials.credentials);

function getRandomInt(min, max) { // return a random integer between min, inclusive and max, inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.endsWith = function(suffix) { // use for checking if a string ends with suffix
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

var imagesFolder = __dirname + '/images';
var lastImagePath = __dirname + '/lastImage.txt';

var cronTime = '0 * * * *'; // run every hour

fs.stat(imagesFolder, function(error) { // check if images folder exists

    if(error) {
        console.log(imagesFolder + ' does not exist\n[Exiting...]');
        process.exit();
    } else {
        // check if folder is empty
        var files = fs.readdirSync(imagesFolder);
        if(files.length) {

            var images = [];

            for(var i = 0; i < files.length; i++) {

                var file = files[i].toLowerCase();

                if(file.endsWith('.jpg')
                || file.endsWith('.jpeg')
                || file.endsWith('.png')
                || file.endsWith('.gif')) { // if file is accepted extension

                    var filePath = imagesFolder + '/' + files[i];
                    try {
                        fs.readFileSync(filePath, {encoding: 'base64'});
                        images.push(files[i]);
                    } catch(error) {
                    }
                }
            }

            if(images.length) {

                fs.stat(lastImagePath, function(error) { // create lastImage file if it doesn't already exist
                    lastImageExists(error);
                });

            } else {
                console.log(imagesFolder + ' has no images\n[Exiting...]');
            }

        } else {
            console.log(imagesFolder + ' has no images\n[Exiting...]');
        }

    }

});

function lastImageExists(error) {

    if (error) {

        try {
            fs.writeFile(lastImagePath, ''); // create empty file
            console.log('Created lastImage.txt\n[Proceeding...]');
        } catch (error) {
            console.log('Could not create lastImage.txt\n[Exiting...]');
            process.exit(); // quit
        }

    } else {
        console.log('lastImage.txt exists\n[Proceeding...]');
    }

    console.log('Starting schedule, cron time is: ' + cronTime + '\n[Proceeding...]');
    schedule.scheduleJob(cronTime, function () {
        routine();
    });
}

function routine() {

    var imageFilenames = fs.readdirSync(imagesFolder);
    var i = getRandomInt(0, imageFilenames.length - 1);

    var lastImage = fs.readFileSync(lastImagePath);
    var newImage = imagesFolder + '/' + imageFilenames[i];

    if (newImage == lastImage) { // if new image is the same as the last image

        i = i + 1; // move to next;

        if (i > imageFilenames.length - 1) {
            i = 0; // wrap around back to 0
        }

        newImage = imagesFolder + '/' + imageFilenames[i];

    }

    var imageBase64 = fs.readFileSync(newImage, {encoding: 'base64'});

    (function (newImage) {
        T.post('account/update_profile_image', {image: imageBase64}, function (error, data) {

            var timestamp = new Date().toISOString();
            console.log('\nLog: ' + timestamp);
            if (error) {
                console.log('Failed to update profile image.');
                console.log(error);
            } else {
                fs.writeFileSync(lastImagePath, newImage);
                console.log('Wrote last image: ' + newImage);
                console.log('Updated profile image: ' + data.profile_image_url);
            }

        });
    }(newImage));
}
