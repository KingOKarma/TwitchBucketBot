const tmi = require('tmi.js');
const config = require("../config.json");
const mongoose = require("mongoose");
const Xp = require("../models/Xp");

const delaySet = new Set();

const opts = {
    identity: {
      username: config.username,
      password: config.password
    },
    channels: [
      config.channel_name
    ]
  };

const client = new tmi.client(opts);

client.connect();

const commandList = [
  { name: 'followers', aliases: [ 'follows' ], permissionLevel: 'normal', action: null },
  { name: 'viewers', aliases: [ 'viewercount' ], permissionLevel: "normal", action: null },
  { name: 'pp', aliases: [ 'size' ], permissionLevel: "normal", action: null },
  { name: 'id', aliases: [ 'myid' ], permissionLevel: "normal", action: null },
  { name: '8ball', aliases: [ 'fortune' ], permissionLevel: "normal", action: null },
  { name: 'capitalize', aliases: [ 'caps' ], permissionLevel: "normal", action: null },
  { name: 'say', aliases: [ 'echo' ], permissionLevel: "normal", action: null },
  { name: 'xp', aliases: [ 'exp' ], permissionLevel: "normal", action: null },


];
for(const command of commandList) {
  
  command.action = require(`../commands/${command.name}`);
}

module.exports =  async (bot, channel, tags, message, self) => {







  if (tags['user-id'] === "513723665") return
  if (tags['user-id'] === "513819451") return


     // xp
     let xpGain = Math.ceil(message.length / 2)




     // if above 50, add 50
     if (xpGain > 11) {
         xpGain = Math.ceil(+10)
     }

     const isBroadcaster = tags.badges && tags.badges.broadcaster;
     const isMod = tags.badges && tags.badges.moderator;
     const isSub = tags.badges && (tags.badges.subscriber || tags.badges.founder);
     const modUp = isMod || isBroadcaster;
     const normal = true
     const permissions = {
         modUp,
         subUp: isSub || modUp,
         normal
     };

     if (permissions.subUp = true) {
       xpGain = xpGain * 2
       console.log(`@${tags['username']} is a sub/mod so they get double xp`)
     } 



     Xp.findOne({ UserID: tags['user-id'] }, (err, user) => {

         if (!user) {
             const newXp = new Xp({
                 UserID: tags['user-id'],
                 userName:tags['username'],
                 xp: xpGain,
                 level: 0
             })
             newXp.save().catch(err => console.log(err))
         } else if (user.xp + xpGain >= user.level * 200 * 2) {


             user.xp = user.xp + xpGain;
             user.level = user.level + 1;
             user.UserName = tags['username']
             user.save().catch(err => console.log(err))
             .then(() => {
              client.say(channel, `@${tags['username']}, Congrats you just leveled up to level ${user.level}`)
             })
             console.log(`${tags['username']} has ${user.xp}xp and gained ${xpGain}xp, they are level ${user.level} to the message\n\n${message}\n\n`)



         } else {

             if (delaySet.has(tags['user-id'])) {

             } else {



                 user.xp = user.xp + xpGain;
                 user.UserName = tags['username']
                 user.ServerName = channel
                 user.save().catch(err => console.log(err))

                 delaySet.add(tags['user-id'])

                 setTimeout(() => {

                     delaySet.delete(tags['user-id'])

                 }, 10000);
             }
         }

     })











      

    if (self) { return; }; // Ignore messages from the bot


    console.log(`${tags['display-name']}: ${message}`);



      if(self || !message.startsWith('!')) return;
      const args = message.slice(1).split(' ');
      const commandName = args.shift().toLowerCase();
      const command = commandList.find(n => n.name === commandName || n.aliases.includes(commandName));
      if(!command) {
          return;
      }
      // const isBroadcaster = tags.badges && tags.badges.broadcaster;
      // const isMod = tags.badges && tags.badges.moderator;
      // const isSub = tags.badges && (tags.badges.subscriber || tags.badges.founder);
      // const modUp = isMod || isBroadcaster;
      // const normal = true
      // const permissions = {
      //     modUp,
      //     subUp: isSub || modUp,
      //     normal
      // };
      if(!permissions[command.permissionLevel]) {
          return;
      }
      const reply = msg => client.say(channel, msg);
      try {
          await command.action({ channel, tags, message, args, reply });
      } catch(err) {
          console.error(err);
      };



      



     












};



