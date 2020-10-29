const tmi = require('tmi.js');
const config = require("./config.json")

// Define configuration options
const opts = {
  identity: {
    username: config.username,
    password: `oauth:${config.password}`
  },
  channels: [
    config.channel_name
  ]
};
// Create a client with our options
const client = new tmi.client(opts);


// Connect to Twitch:
client.connect();


const fs = require('fs'); // fs is the package we need to read all files which are in folders

fs.readdir(`./events/`, (err, files) => {
  if (err) return console.error;
  files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const evt = require(`./events/${file}`);
    let evtName = file.split('.')[0];
    console.log(`Loaded event '${evtName}'`);
    client.on(evtName, evt.bind(null, client));
  });
});




