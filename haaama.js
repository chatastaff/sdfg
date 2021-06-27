const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const { Prefix, Token, Color } = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.db = require("quick.db");

client.on("ready", async () => {
  console.log(`ready!`);
  client.user
       .setActivity(`${Prefix}help | ${client.guilds.cache.size} Server`, { type: "PLAYING" })
       .setActivity(`HaaaMa`)
    .catch(error => console.log(error));
});

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>`))) {
    return message.channel.send(`My Prefix is \`${Prefix}\``);
  }
});

let modules = ["fun", "info", "moderation", "gif", "photo", "text"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(err, files) {
    if (err)
      return new Error(
        "Missing Folder Of Commands! Example : Commands/<Folder>/<Command>.js"
      );
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} Command Has Been Loaded - ✅`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      if (command.aliases.length === 0) command.aliases = null;
    });
  });
});

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  if (!message.content.startsWith(Prefix)) return;

  const args = message.content
    .slice(Prefix.length)
    .trim()
    .split(" ");
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!command) return;

  if (command) {
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "I Don't Have Enough Permission To Use This Or Any Of My Commands | Require : Administrator"
      );
    command.run(client, message, args);
  }
  console.log(
    `User : ${message.author.tag} (${message.author.id}) Server : ${message.guild.name} (${message.guild.id}) Command : ${command.name}`
  );
});


const channelid = "843947526432096286"    //id channele vc
client.on("ready", () => {
    const channel = client.channels.cache.get(channelid);
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
        console.log("Successfully connected.");
    }).catch(e => {
        console.error(e);
    });
}); 





client.on("message", message => {
  if (message.content === prefix + "lock") {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
   

    if (!message.channel.guild) return;

    let bwan = new Discord.MessageEmbed()

      .setFooter("Channel Locked 🔒")
      .setColor("RANDOM")
      .setTitle("Locked");
      message.react("🔒")
    message.channel.send(bwan);

    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: false
    });
  }
});

//////////////////////////////////////////////////////////////////

client.on("message", message => {
  if (message.content === prefix + "unlock") {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
   

    if (!message.channel.guild) return;

    let bwan = new Discord.MessageEmbed()

      .setFooter("Channel unlock 🔓")
      .setColor("RANDOM")
      .setTitle("Unlocked");
      message.react("🔓")
    message.channel.send(bwan);

    message.channel.updateOverwrite(message.guild.id, {
      SEND_MESSAGES: true
    });
  }
});



client.on("message", message => {
  if (message.content.startsWith(prefix + "listem", "listemoji")) {
    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach(emoji => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });
    let Embed = new Discord.MessageEmbed()
      .setTitle(`Emojis in ${message.guild.name}.`)
      .setDescription(
        `**Animated [${Animated}]**:\n${EmojisAnimated}\n\n**Standard [${EmojiCount}]**:\n${Emojis}\n\n**All Emoji [${OverallEmojis}]**`
      )
      .setColor(`RANDOM`);
    message.channel.send(Embed);
  }
});



client.on("message", function(message) {
  let args = message.content
    .split(" ")
    .slice(1)
    .join(" ");
  if (message.content.startsWith(prefix + "say")) {
    if (!message.member.hasPermission("MANAGE_MESSAGE")) if (!args) return;
    message.channel.send(`** ${args}**`);
  }
});



client.on("message", async message => {
  if (message.content.startsWith(prefix + "uptime")) {
    let day = Math.floor(client.uptime / 86400000);
    let oclock = Math.floor(client.uptime / 3600000) % 24;
    let minte = Math.floor(client.uptime / 60000) % 60;
    let second = Math.floor(client.uptime / 1000) % 60;

    return message.channel.send(
      `__Uptime:__\n${day}d ${oclock}h ${minte}m ${second}s`
    );
  }
});


















client.on('message', message => {
    let argresult = message.content.split(` `).slice(1).join(' ');
    if (message.content.startsWith(prefix + 'setStreaming')) {
      if (!devs.includes(message.author.id)) return message.channel.send("<@429972030092476437> only this guy can do restart the bot so don't try again :wink:.");
      message.delete();
      client.user.setGame(argresult, 'https://twitch.tv/DynastyShop');

    } else if(message.content.startsWith(prefix + 'setWatching')) {
        client.user.setActivity(argresult,{type: 'WATCHING'});

      } else if(message.content.startsWith(prefix + 'setListening')) {
        client.user.setActivity(argresult,{type: 'LISTENING'});

      } else if(message.content.startsWith(prefix + 'setPlaying')) {
        client.user.setActivity(argresult,{type: 'PLAYING'});

      } else if(message.content.startsWith(prefix + 'setName')) {
        client.user.setUsername(argresult);

      } else if(message.content.startsWith(prefix + 'setAvatar')) {
        client.user.setAvatar(argresult);


      } else if(message.content.startsWith(prefix + 'setStatus')) {
        if(!argresult) return message.channel.send('`online`, `DND(Do not Distrub),` `idle`, `invisible(Offline)` :notes: أختر أحد الحالات');
        client.user.setStatus(argresult);


    }

  });


client.login(process.env.BOT_TOKEN);








//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Haaama /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     ////     Token     ////

client.login('ODE0NjA4NzA3NDEyMjk1Nzgw.YDgVeg.HvMJ4jRnJPfxjBa9QdmdcnN1pvE');
const prefix = "1";



     ///    Prefix    ///



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Haaama /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa /// HaaaMa 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





