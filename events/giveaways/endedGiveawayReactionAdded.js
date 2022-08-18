const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member, reaction){
     reaction.users.remove(member.user);
  member.send(`**Hay aksi! Görünüşe göre bu çekiliş çoktan sona erdi!**`).catch(e => {})
  }
}