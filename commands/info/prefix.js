

const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const { Prefix } = require("../../config.js");







module.exports = {

  name: `prefix`,

  description: "(px)Sets a server specific Prefix",

  aliases: ["px"],

  cooldown: 3,

  edesc: `Type this Command, to set a server specific Prefix! Usage: ${PREFIX}prefix <NEW PREFIX>`,

 async execute(message, args, client) {

    let prefix = await db.get(`prefix_${message.guild.id}`)

    if(prefix === null) prefix = PREFIX;

    //react with approve emoji

    message.react("✅");

    if(!args[0]) return message.channel.send(new MessageEmbed()

    .setColor("#FF0000")

    .setTitle(`Current Prefix: \`${prefix}\``)

    .setFooter('Please provide a new prefix')

    );

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new MessageEmbed()

    .setColor("#FF0000")

    .setTitle(`You don\'t have permission for this Command!`)

    );

    if(args[1]) return message.channel.send(new MessageEmbed()

    .setColor("#FF0000")

    .setTitle(`'The prefix can\'t have two spaces'`));

    db.set(`prefix_${message.guild.id}`, args[0])

    message.channel.send(new MessageEmbed()

    .setColor("#FF0000")

    .setTitle(`Successfully set new prefix to **\`${args[0]}\`**`))

  }

}
