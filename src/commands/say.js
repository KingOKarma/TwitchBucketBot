module.exports = async ({ channel, tags, message, args, reply }) => {


    if(args[0] === undefined) { 
        return reply(`@${tags['username']} I need a message to say.`)
    }

    reply(args.join(' '))



}