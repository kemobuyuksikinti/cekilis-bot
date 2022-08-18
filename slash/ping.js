const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'ping',
    description: '🏓 Pingimi kontrol et!',
    run: async (client, interaction) => {
      let pembed = new MessageEmbed()
		  .setColor('#2F3136')	
		  .setTitle('Sunucu Pingi')
		  .addField('**Gecikme**', `\`${Date.now() - interaction.createdTimestamp}ms\``)
		  .addField('**API Gecikmesi**', `\`${Math.round(client.ws.ping)}ms\``)
		  .setTimestamp()
                  .setFooter({
                     text: `${interaction.user.username}`,
                     iconURL: interaction.user.displayAvatarURL()
                  })
        interaction.reply({
          embeds: [pembed]
        });
    },
};
