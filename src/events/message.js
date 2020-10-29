const tmi = require('tmi.js');
const config = require("../config.json");

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





];
for(const command of commandList) {
  
  command.action = require(`../commands/${command.name}`);
}

module.exports =  async (bot, channel, tags, message, self) => {


      

    if (self) { return; }; // Ignore messages from the bot


    console.log(`${tags['display-name']}: ${message}`);



      if(self || !message.startsWith('!')) return;
      const args = message.slice(1).split(' ');
      const commandName = args.shift().toLowerCase();
      const command = commandList.find(n => n.name === commandName || n.aliases.includes(commandName));
      if(!command) {
          return;
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



