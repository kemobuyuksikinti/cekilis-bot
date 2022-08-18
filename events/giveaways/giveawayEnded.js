const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.MessageEmbed()
          .setTitle(`🎁 Hadi gidelim!`)
          .setColor("#2F3136")
          .setDescription(`${member.user}\n Merhaba **[[Bu çekilişi]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n kazandığınızı duydum. **${giveaway.prize}!**\nÖdülünüzü almak için çekiliş sahibine mesaj gönderin`)
          .setTimestamp()
          .setFooter({
            text: `${member.user.username}`, 
            iconURL: member.user.displayAvatarURL()
           })
        ]
      }).catch(e => {})
    });

  }
}
