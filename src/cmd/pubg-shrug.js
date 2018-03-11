exports.run = (bot, msg, params) => {
    let shrugString = '';
    let amount = 1;
    if(params[0] && !isNaN(params[0])) {
        amount = +params[0];
    }

    for(let i = 0; i < amount; i++){
        let backslash = '\\';
        shrugString += '¯' + backslash.repeat(3) + '_ツ' + backslash + '_/¯\t';
    }

    msg.channel.send(shrugString);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'pubg-shrug',
    description: 'Get your shrug on',
    usage: 'pubg-shrug <amount of shrugs>'
};