// SETUP 

const Twit = require('twit');

const T = new Twit({
	consumer_key: '5mzvZtbOfrJ3Q2xdrC1Q1nPAP',
	consumer_secret: 'pMGypGRIMmro0TuEN2XU0rfjGSDAvI4e2aH2Qp0mFNWoxcPrsC',
	access_token: '743145993844178944-RECsFVYb1YOsZ1MYo1XA0IZWLiSILUS',
	access_token_secret: 'YJvZ6G2Vyp16ztM4lpY1nWGmtkX8phGEq1G1336RAwCGW'
});

const IreAderinokun = {
	id: 2714960622,
	screen_name: 'ireaderinokun'
}

const botsofcode = {
	id: 743145993844179000,
	screen_name: 'botsofcode'
}





const simple_tweet = (tweet) => {
	T.post('statuses/update', {
		status: tweet
	});
}

const retweet = (tweet) => {
	T.post('statuses/retweet/:id', { id: tweet.id_str });
};

const reply = (tweet, reply) => {
	T.post('statuses/update', {
		status: `@${tweet.user.screen_name} ${reply}`,
		in_reply_to_status_id: tweet.id_str
	});
}

const like = (tweet) => {
	T.post('favorites/create', { id: tweet.id_str });
}







const stream = T.stream('statuses/filter', { track: ['bitsofco.de', 'bitsofcode'] });

stream.on('tweet', (tweet) => {
	console.log(tweet);

	if ( tweet.user.id === IreAderinokun.id ) {
		like(tweet);
		retweet(tweet);
		return;
	}
	if ( tweet.text.includes('via @ireaderinokun') ) {
		reply(tweet, 'Thanks for sharing!');
		return;
	} 
	if ( tweet.user.id !== botsofcode.id ) {
		const tweet_url = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
		simple_tweet(`@${IreAderinokun.screen_name} ${tweet_url}`)
	}

});

