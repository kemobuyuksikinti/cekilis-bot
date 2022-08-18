const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
  name: 'help',
  description: '📜 Botun kullanabileceği tüm komutları görüntüleyin!',
  run: async (client, interaction) => {
    const embed = new MessageEmbed()
      .setTitle(`${client.user.username} Komutları`)
      .setColor('#2F3136')
      .setDescription('**Lütfen tüm komutlarını görüntülemek için bir kategori seçin**')
      .addField(`Links:`, `- [Discord Sunucumuz](https://discord.gg/500)\n- [Beni sunucuna davet et](https://discord.com/api/oauth2/authorize?client_id=1007643115533901954&permissions=8&scope=applications.commands%20bot)\n- [Discord Sunucumuz](https://discord.gg/500)`, true)
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username} | Tarafından talep edildi`,
        iconURL: interaction.user.displayAvatarURL()
      })

    const giveaway = new MessageEmbed()
      .setTitle("Kategoriler » Hediye")
      .setColor('#2F3136')
      .setDescription("```yaml\nİşte çekiliş komutları:```")
      .addFields(
        { name: 'Create / Start', value: `Sunucunuzda bir çekiliş başlatın!\n > **Komut Türleri: __\`slash\` / \`message\`__**`, inline: true },
        { name: 'Edit', value: `Halihazırda devam eden bir çekilişi düzenleyin!\n > **Komut Türleri: __\`slash\` / \`message\`__**`, inline: true },
        { name: 'End', value: `Halihazırda devam eden bir çekilişi sonlandırın!\n > **Komut Türleri: __\`slash\` / \`message\`__**`, inline: true },
        { name: 'List', value: `Bu sunucu içinde yürütülen tüm çekilişleri listeleyin!\n > **Komut Türleri: __\`slash\` / \`message\`__**`, inline: true },
        { name: 'Pause', value: `Halihazırda devam eden bir çekilişi duraklatın!\n > **Komut Türleri __\`slash\`__**`, inline: true },
        { name: 'Reroll', value: `Biten bir çekilişin kazananını yeniden seçin!\n > **Komut Türleri: __\`slash\` / \`message\`__**`, inline: true },
        { name: 'Resume', value: `Duraklatılmış bir çekilişe devam edin!\n > **Komut Türleri: __\`slash\`__**`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username} | Tarafından talep edildi`,
        iconURL: interaction.user.displayAvatarURL()
      })

    const general = new MessageEmbed()
      .setTitle("Categories » General")
      .setColor('#2F3136')
      .setDescription("```yaml\nİşte genel bot komutları:```")
      .addFields(
        { name: 'Help', value: `Bu bot için mevcut tüm komutları gösterir!\n > **Komut Türleri: __\`slash\` / \`message\`__**`, inline: true },
        { name: 'Invite', value: `Botun davet bağlantısını alın!\n > **Komut Türleri: __\`slash\` / \`message\`__**`, inline: true },
        { name: 'Ping', value: `Botun sunucu gecikmesini kontrol edin!\n > **Komut Türleri: __\`slash\` / \`message\`__**`, inline: true },
      )
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.username} | Tarafından talep edildi`,
        iconURL: interaction.user.displayAvatarURL()
      })

    const components = (state) => [
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("help-menu")
          .setPlaceholder("Lütfen bir kategori seçin")
          .setDisabled(state)
          .addOptions([{
            label: `Giveaways`,
            value: `giveaway`,
            description: `Tüm çekiliş tabanlı komutları görüntüleyin!`,
            emoji: `🎉`
          },
          {
            label: `General`,
            value: `general`,
            description: `Tüm genel bot komutlarını görüntüleyin!`,
            emoji: `⚙`
          }
          ])
      ),
    ];

    const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });

    const filter = (interaction) => interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector(
      {
        filter,
        componentType: "SELECT_MENU",
        idle: 300000,
        dispose: true,
      });

    collector.on('collect', (interaction) => {
      if (interaction.values[0] === "giveaway") {
        interaction.update({ embeds: [giveaway], components: components(false) }).catch((e) => { });
      } else if (interaction.values[0] === "general") {
        interaction.update({ embeds: [general], components: components(false) }).catch((e) => { });
      }
    });
    collector.on('end', (collected, reason) => {
      if (reason == "time") {
        initialMessage.edit({
          content: "Koleksiyoner Yok Edildi, Tekrar Deneyin!",
          components: [],
        });
      }
    })
  }
}
