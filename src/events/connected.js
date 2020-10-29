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



module.exports =  (bot, address, port) => {

    console.log(`* Connected to ${address}:${port}`);



}