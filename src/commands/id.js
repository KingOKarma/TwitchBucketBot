const fetch = require('node-fetch');

const config = require("../config.json")

module.exports = async ({ channel, tags, message, args, reply }) => {


    if (args[0] === undefined) {
        reply(`@${tags['username']} your ID is: ${tags['user-id']}`)
        return
    }


    if (args[0].match(/^[a-zA-Z0-9][\w]{3,24}$/) === null) return reply("That's not a user")




    if (args[0] !== undefined) {


        const res = await fetch(
            `https://api.twitch.tv/helix/users?login=${args[0].match(/^[a-zA-Z0-9][\w]{3,24}$/)}&login=${args[0].match(/^[a-zA-Z0-9][\w]{3,24}$/)}`,
            {
                headers: {
                    'Client-ID': config.client_id,
                    'Authorization': `Bearer ${config.password}`,
                    // 'Accept': 'application/vnd.twitchtv.v5+json'
                }
            }
        );
        if (res.status !== 200) {
            throw new Error(`Received a ${res.status} status code`);
        }

        const body = await res.json();
        console.log(body.data[0])
        if (body.data[0] === undefined) return reply("I can't find that user");

        return reply(`@${tags['username']} ${body.data[0].display_name}'s ID is: ${body.data[0].id}`)
        



    } else {


        reply(`@${tags['username']} your ID is: ${tags['user-id']}`)
    }

}