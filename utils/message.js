const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **Çekiliş** 🎉",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **Çekiliş bitti** 🎉",
  drawing:  `Şu tarihte sona ericek: **{timestamp}**`,
  inviteToParticipate: `Katılmak için 🎉 emojisine basın!`,
  winMessage: "Tebrikler, {winners} **{this.prize}** adlı çekilişi sen kazandın 🎉!",
  embedFooter: "Giveaways",
  noWinner: "Çekiliş iptal edildi, geçerli katılım yok.",
  hostedBy: "Çekilişi başlatan: {this.hostedBy}",
  winners: "kazanan(lar)",
  endedAt: "Şu tarihte sona erdi:"
}