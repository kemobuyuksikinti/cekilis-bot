const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      embeds: [new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle('❓ Bekleyin Bir Çekilişten Bir Tepkiyi Az önce Kaldırdınız mı?')
        .setColor("#2F3136")
        .setDescription(
          `[Bu çekiliş](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) için Girişiniz kaydedildi, ancak ihtiyacınız olmadığı için tepki vermediniz.**${giveaway.prize}** bu ödülü kazanmak için yeniden çekilişe katılın 😭`
        )
        .setFooter({ text: "Eğer bir sorun olduğunu düşünüyorsan yeniden tepkiye bas!" })
      ]
    }).catch(e => {})

  }
}
