const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.MessageEmbed()
          .setTitle(`🎁 Hadi gidelim! Yeni kazanan seçildi!`)
          .setColor("#2F3136")
          .setDescription(`Merhaba ${member.user}\n  **[[Bu çekiliş]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**\n İçinÇekiliş sahibinin yeni kazanan seçtiğini ve senin kazandığını duydum **${giveaway.prize}!**\n Bu ödülü almak için çekiliş sahibine yazınız!!`)
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
