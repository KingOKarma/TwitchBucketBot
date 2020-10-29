module.exports = async ({ channel, tags, message, args, reply }) => {


    if (args[0] === undefined) {
        return reply(`@${tags['display-name']} please say a sentence with "!caps"`)
    }

    var sentence = args.join(" ").split("");
          var capitalized = [];

          sentence.forEach(char => {
            if (Math.random() < 0.5) {
              capitalized = capitalized + char.toUpperCase();
            } else {
              capitalized = capitalized + char
            }

          });

          reply(capitalized)



}