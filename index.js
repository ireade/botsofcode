/* ******************

 Fixes for Heroku
 See http://stackoverflow.com/a/31094668

 ******************* */

const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000));
app.get('/', function (request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});


/* ******************

 The Setup

 ******************* */
const T = require('./modules/T');
const Twitter = require('./modules/twitter');

/* ******************

 Key Variables

 ******************* */
const me = {
    id: 2714960622,
    screen_name: 'ireaderinokun'
};

const botsofcode = {
    id: 743145993844179000,
    screen_name: 'botsofcode'
};

const emojis = ['👊', '👊', '🙌', '👍', '💁', '👌', '🙅', '👯'];


/* ******************

 General Functions

 ******************* */
function shouldSendReply() {
    const randomNumber = Math.random();
    if (randomNumber > 0.3) return true;
    return false;
}

function getEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}


/* ******************

 Stream

 ******************* */

const stream = T.stream('statuses/filter', { track: ['bitsofco.de', 'bitsofcode'] });

stream.on('tweet', (tweet) => {

	if ( tweet.user.id === botsofcode.id ) {
		return;
	}

    Twitter.like(tweet);

	if ( tweet.user.id === me.id ) {
        Twitter.retweet(tweet);
		return;
	}

	if ( tweet.text.toLowerCase().includes('@ireaderinokun') ) {
		if ( shouldSendReply() ) {
            Twitter.reply(tweet, `Thanks for sharing! ${ getEmoji() }`);
		}
		return;
	}

    Twitter.reply(tweet, `Thanks for sharing! ${ getEmoji() } (cc @${me.screen_name})`);

});



