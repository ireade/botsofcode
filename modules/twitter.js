const T = require('./T');

module.exports = {
    tweet: (tweet) => {
        T.post('statuses/update', {
            status: tweet
        });
    },

    retweet: (tweet) => {
        T.post('statuses/retweet/:id', {id: tweet.id_str});
    },

    reply: (tweet, reply) => {
        T.post('statuses/update', {
            status: `@${tweet.user.screen_name} ${reply}`,
            in_reply_to_status_id: tweet.id_str
        });
    },

    like: (tweet) => {
        T.post('favorites/create', {id: tweet.id_str});
    },

    addToList: (list, user) => {
        T.post('lists/members/create', {
            slug: list,
            owner_screen_name: botsofcode.screen_name,
            screen_name: user
        });
    }
}