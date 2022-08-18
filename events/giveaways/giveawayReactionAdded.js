const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, reactor, messageReaction) {
    let approved =  new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#2F3136")
    .setTitle("Giriş Onaylandı! | Kazanma şansın var!!")
    .setDescription(
      `[Bu çekilişe](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) girişiniz onaylandı!`
    )
    .setFooter({ text: "Yanaki vermeyi unutmayın" })
    .setTimestamp()
   let denied =  new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("#2F3136")
    .setTitle(":x: Giriş Reddedildi | Veritabanı Girişi Bulunamadı ve İade Edildi!")
    .setDescription(
      `[Bu çekilişe](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) Girişiniz reddedildi, lütfen çekiliş gereksinimlerini doğru bir şekilde gözden geçirin.`
    )
    .setFooter({ text: "Yanaki vermeyi unutmayın" })

    let client = messageReaction.message.client
    if (reactor.user.bot) return;
    if(giveaway.extraData) {
      if (giveaway.extraData.server !== "null") {
        try { 
        await client.guilds.cache.get(giveaway.extraData.server).members.fetch(reactor.id)
        return reactor.send({
          embeds: [approved]
        });
        } catch(e) {
          messageReaction.users.remove(reactor.user);
          return reactor.send({
            embeds: [denied]
          }).catch(e => {})
        }
      }
      if (giveaway.extraData.role !== "null" && !reactor.roles.cache.get(giveaway.extraData.role)){ 
        messageReaction.users.remove(reactor.user);
        return reactor.send({
          embeds: [denied]
        }).catch(e => {})
      }

      return reactor.send({
        embeds: [approved]
      }).catch(e => {})
    } else {
        return reactor.send({
          embeds: [approved]
        }).catch(e => {})
    }
    }
  }
