const fetch = require('node-fetch');
const config = require("../config.json")

module.exports = async ({ channel, tags, message, args, reply }) => {

    const res = await fetch(
        `https://api.twitch.tv/kraken/streams/${tags['room-id']}`,
        {
            headers: {
                'Client-ID': config.client_id,
                'Authorization': `Bearer ${config.password}`,
                'Accept': 'application/vnd.twitchtv.v5+json'
            }
        }
    );
    if (res.status !== 200) {
        throw new Error(`Received a ${res.status} status code`);
    }


    const body = await res.json();
    if (body.stream === null) {
        return reply(`@${tags.username}, ${channel.slice(1)} is currently offline.`)
    }
    console.log(body)

    return reply(`@${tags.username}, ${channel.slice(1)} has ${body} viewers(s)`);
};