const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'invite',
    description: '➕ Botu sunucunuza davet edin!',
    run: async (client, interaction) => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel(`Davet edin ${client.user.username}`)
        .setStyle('LINK')
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
        new MessageButton()
        .setLabel('Botun Sunucusu')
        .setStyle('LINK')
        .setURL("https://discord.gg/500"),
    )
    let invite = new MessageEmbed()
      .setAuthor({ 
          name: `Invite ${client.user.username}`, 
          iconURL: client.user.displayAvatarURL() 
      })    
    .setTitle("Invite & Support Link!")
    .setDescription(`Botu ${client.user} Bugün sunucunuza davet edin ve gelişmiş özelliklerle sorunsuz çekilişlerin tadını çıkarın!`)
    .setColor('#2F3136')
    .setTimestamp()
    .setFooter({
        text: `${interaction.user.username} | Tarafından talep edildi.`,
        iconURL: interaction.user.displayAvatarURL()
    })
    
    interaction.reply({ embeds: [invite], components: [row]});
}
}
