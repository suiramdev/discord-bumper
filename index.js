const config = require('./config.json');
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', function() {
    setInterval(() => {
        console.log("👀 Looking for potential bumps...")
        for (let server in config.bumpServers) {
            const serverConfig = config.bumpServers[server];
            const channel = client.guilds.get(server).channels.get(serverConfig.channel);
            channel.fetchMessages()
                .then(messages => {
                    const botMessages = messages.filter(message => message.author.id == serverConfig.bot);
                    if (new Date(botMessages.last().createdTimestamp).getHours() + 2 >= new Date().getHours()) {
                        console.log("🎉 Bumped");
                        channel.send(serverConfig.command);
                    }
                });
        }
    }, 10000);
});

client.login(config.token);