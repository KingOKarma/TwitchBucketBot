module.exports = async ({ channel, tags, message, args, reply }) => {



    if (!args.join(' ')) return reply("To have a your future read you must ask of your future first? \nPlease specify what you want to ask about your future?")

    let fortune = ['Ain\'t gonna happn', 'This will indeed come true', 'KFC grants decides this will happen', '**Bucket Boi say:** "Nope"',
        'I mean... it might happen ¯\_(ツ)_/¯', 'I\'m swaying towards more no but it could happen', 'Yeahhhhhh... no', 'pft idk',
        'possibly this may not not happen', 'this will not will not not happen', 'try asking someone else i\'m busy', 'ummm... yes?',
        'yes', 'no', 'maybe', 'possibly', 'possibly not', 'try getting a higher role first then i\'ll tell you', 'how about no', 'how about yes', '???? no clue dude'];
    let random = fortune[Math.floor(Math.random() * fortune.length)];

    reply(random);




}