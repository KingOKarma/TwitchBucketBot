const fetch = require('node-fetch');
const config = require("../config.json");
const mongoose = require("mongoose");
const Xp = require("../models/Xp");


module.exports = async ({ channel, tags, message, args, reply }) => {


    function Embed(User) {



        Xp.findOne({ UserID: User.id }, (err, xp) => {
            if (err) console.log(err);

            if (xp) {

                // levelEmbed.setDescription(`**__Global__**\nis level \`${xp.level}\` and has \`${gp.xp}xp\``)
                //      .addField("Global XP for next level", xp.level * 300 * 2, true)
                //     .addField("Global Xp left", xp.level * 300 * 2 - xp.xp, true)
                //     .catch(() => {
                reply(`@${User.login} is level ${xp.level} with ${xp.xp}xp, ${extraMSG} need ${xp.level * 200 * 2 - xp.xp} more xp to level up.`)
                // })

            } else {

                reply(`@${User.login} is level 0 with 0xp, ${extraMSG} need 0 more xp to level up.`)





            }

        }).catch((err) => {
            message.reply("Database error\n__Reason__\n" + err)
        })


    }

    if (args[0] === undefined) {



        const res = await fetch(
            `https://api.twitch.tv/helix/users?id=${tags['user-id']}&id=${tags['user-id']}`,
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
        let theUser = body.data[0]

        console.log(theUser)


        
        extraMSG = "you"
        extraMSG2 = "you're"
        Embed(theUser)



    } else {


        if (args[0].match(/[0-9]{9}/) === null) return reply("That's not a user, Please Use their ID (Hint: use \"!id <username>\" to find someone's id)")

        const res = await fetch(
            `https://api.twitch.tv/helix/users?id=${args[0].match(/[0-9]{9}/)}&id=${args[0].match(/[0-9]{9}/)}`,
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
        let theUser = body.data[0]

        console.log(theUser)


        if (theUser === undefined) {

           reply("I Couldnt find that user")


        } else {//if User is pinged

            extraMSG = "they"
            extraMSG2 = "they're"
            Embed(theUser)
        };






    }
}
