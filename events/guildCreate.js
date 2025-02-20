const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js")

module.exports = {
  name: 'guildCreate',
  async execute(guild, client) {
    const row1 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('select')
          .setPlaceholder('Nothing selected')
          .addOptions(
            {
              label: '/play',
              description: 'Starts playing Lo-fi radio station!',
              value: `play`,
            },
            {
              label: '/radio',
              description: 'Plays the stream from provided Radio station!',
              value: `radio`,
            },
            {
              label: '/forceplay',
              description: 'Allows you to force play the given radio station',
              value: `forceplay`,
            },
            {
              label: '/stop',
              description: 'Stops the current Voice session',
              value: `stop`,
            },
            {
              label: '/zen',
              description: 'Starts playing Zen radio station!',
              value: `zen`,
            }
          ),
      );
    let row2 = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle('PRIMARY')
          .setEmoji('▶️')
          .setCustomId('play'),
        new MessageButton()
          .setStyle('LINK')
          .setURL('https://ko-fi.com/Himal')
          .setEmoji('919834131670646824'),
        new MessageButton()
          .setStyle('LINK')
          .setURL('https://discord.com/invite/nZRMdQeK6m')
          .setEmoji('882684602639081492'),
        new MessageButton()
          .setLabel('Invite Me')
          .setStyle('LINK')
          .setURL('https://himal.grizz1e.xyz/invite')
          .setEmoji('882683102890197062')
      )
    try {
      let defaultChannel = "";
      guild.channels.cache.forEach((channel) => {
        if(channel.type == "GUILD_TEXT" && defaultChannel == "") {
          if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
            defaultChannel = channel.id;
          }
        }
      })
      let channel = guild.channels.cache.get(guild.systemChannelID || defaultChannel);
      let embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription("The available commands are provided below. To view the command description, select the command name from the selection menu provided below\n\n**Join a Voice Channel and hit the :arrow_forward: button to start playing**\n\n**Available Commands:**\n`forceplay`, `help`, `play`, `radio`, `stop`, `zen`\n\n*Note: Himal uses slash commands, it doesn't have a prefix*")
        .setAuthor({name: "Thank you for inviting me to the server", url: "https://himal.grizz1e.xyz", iconURL: client.user.displayAvatarURL()})
      channel.send({embeds: [embed], components: [ row2, row1 ]})
    } catch (err) {
      return;
    }
  },
};