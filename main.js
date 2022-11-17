const Discord = require("discord.js");
const client = new Discord.Client({ intents: 7753 });
const fs = require("fs");
const config = require("./config.json");
client.config = config;


client.interactions = new Discord.Collection();
client.register_arr = []
fs.readdir("./slash/", (_err, files) => {
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./slash/${file}`);
        let commandName = file.split(".")[0];
        client.interactions.set(commandName, {
            name: commandName,
            ...props
        });
        client.register_arr.push(props)
    });
});

client.login(config.token);