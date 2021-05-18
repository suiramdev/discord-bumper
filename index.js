const config = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', function() {
    console.log("👀 Looking for potential bumps...");
    setInterval(() => {
        for (let server in config.bumpServers) {
            const serverConfig = config.bumpServers[server];
            const channel = client.guilds.get(server).channels.get(serverConfig.channel);
            channel.fetchMessages()
                .then(messages => {
                    const botMessages = messages.filter(message => message.author.id == serverConfig.bot && message.embeds[0].color == 2406327);
                    if (new Date(botMessages.last().createdTimestamp).getMilliseconds() - new Date().getMilliseconds() >= serverConfig.delay)
                        channel.send(serverConfig.command);
                });
        }
    }, 2000);
});

client.login(config.token);
