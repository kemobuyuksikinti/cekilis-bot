const Discord = require("discord.js")
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
  name: 'start',
  description: '🎉 Çekiliş Başlat',

  options: [
    {
      name: 'süre',
      description: 'Çekilişin ne kadar sürmesi gerektiğini yaz. Örnek değerler: 1m, 1h, 1d',
      type: 'STRING',
      required: true
    },
    {
      name: 'kazananlar',
      description: 'Çekilişin kaç kazananı olmalıysa o kadar değer girin. Örnek değerler: 1, 2, 3',
      type: 'INTEGER',
      required: true
    },
    {
      name: 'ödül',
      description: 'Çekilişin ödülü ne olmalıysa onu yazınız. Örnek gösterim: Nitro, Netflix, Spotify',
      type: 'STRING',
      required: true
    },
    {
      name: 'kanal',
      description: 'Çekilişi hangi kanalda başlıyacağını seçiniz.',
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'bonusrol',
      description: 'Bonus girişleri hangi rol alacak ise o rolü belirtiniz.',
      type: 'ROLE',
      required: false
    },
    {
      name: 'bonusgiriş',
      description: 'Rolün alacağı bonus giriş miktarını yazınız.',
      type: 'INTEGER',
      required: false
    },
    {
      name: 'davet',
      description: 'Çekiliş katılım şartı olarak eklemek istediğiniz sunucunun davetini var ise buraya yazabilirsiniz.',
      type: 'STRING',
      required: false
    },
    {
      name: 'rol',
      description: 'Çekiliş katılım şartı olarak eklemek istediğiniz rolü seçiniz.',
      type: 'ROLE',
      required: false
    },
  ],

  run: async (client, interaction) => {

    // If the member doesn't have enough permissions
    if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.reply({
        content: ':x: Çekilişi başlatmak için mesajları yönetme izinlerine sahip olmanız gerekir.',
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('kanal');
    const giveawayDuration = interaction.options.getString('süre');
    const giveawayWinnerCount = interaction.options.getInteger('kazananlar');
    const giveawayPrize = interaction.options.getString('ödül');

    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: ':x: Lütfen bir metin kanalı seçin!',
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: ':x: Lütfen geçerli bir süre seçin!',
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: ':x: Lütfen geçerli bir kazanan sayısı seçin! Sayı en az 1 veya 1 den büyük olacak şekilde seçim yapınız.',
      })
    }

    const bonusRole = interaction.options.getRole('bonusrole')
    const bonusEntries = interaction.options.getInteger('bonusamount')
    let rolereq = interaction.options.getRole('role')
    let invite = interaction.options.getString('invite')

    if (bonusRole) {
      if (!bonusEntries) {
        return interaction.reply({
          content: `:x: Kaç tane bonus rolün alınacağını ${bonusRole} seçiniz!`,
          ephemeral: true
        });
      }
    }


    await interaction.deferReply({ ephemeral: true })
    let reqinvite;
    if (invite) {
      let invitex = await client.fetchInvite(invite)
      let client_is_in_server = client.guilds.cache.get(
        invitex.guild.id
      )
      reqinvite = invitex
      if (!client_is_in_server) {
        return interaction.editReply({
          embeds: [{
            color: "#2F3136",
            author: {
              name: client.user.username,
              iconURL: client.user.displayAvatarURL() 
            },
            title: "Server Check!",
            url: "https://youtube.com/c/ZeroSync",
            description:
              "Yeni bir sunucu görüyorum! O sunucuda olduğumdan emin misin? Beni o sunucuya davet et 😳",
            timestamp: new Date(),
            footer: {
              iconURL: client.user.displayAvatarURL(),
              text: "Server Check"
            }
          }]
        })
      }
    }

    if (rolereq && !invite) {
      messages.inviteToParticipate = `**Katılmak için 🎉 emojisine basınız!**\n>>> - Bu çekilişe sadece ${rolereq} bu role sahip olan üyeler katılabilir!`
    }
    if (rolereq && invite) {
      messages.inviteToParticipate = `**Katılmak için 🎉 emojisine basınız!**\n>>> - Bu çekilişe sadece ${rolereq} bu role sahip olan üyeler katılabilir!\n- Üyelerin çekilişe katılmaları için (${invite}) bu sunucuya girmeleri gereklidir!`
    }
    if (!rolereq && invite) {
      messages.inviteToParticipate = `**Katılmak için 🎉 emojisine basınız!**\n>>> - Üyelerin çekilişe katılmaları için (${invite}) bu sunucuya katılmaları gereklidir!`
    }


    // start giveaway
    client.giveawaysManager.start(giveawayChannel, {
      // The giveaway duration
      duration: ms(giveawayDuration),
      // The giveaway prize
      prize: giveawayPrize,
      // The giveaway winner count
      winnerCount: parseInt(giveawayWinnerCount),
      // BonusEntries If Provided
      bonusEntries: [
        {
          // Members who have the role which is assigned to "rolename" get the amount of bonus entries which are assigned to "BonusEntries"
          bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
          cumulative: false
        }
      ],
      // Messages
      messages,
      extraData: {
        server: reqinvite == null ? "null" : reqinvite.guild.id,
        role: rolereq == null ? "null" : rolereq.id,
      }
    });
    interaction.editReply({
      content:
        `Çekiliş başladı ${giveawayChannel}!`,
      ephemeral: true
    })

    if (bonusRole) {
      let giveaway = new Discord.MessageEmbed()
        .setAuthor({ name: `Bonus Giriş Uyarısı!` })
        .setDescription(
          `**${bonusRole}** Bu **${bonusEntries}** çekilişte ekstra girişler var!`
        )
        .setColor("#2F3136")
        .setTimestamp();
      giveawayChannel.send({ embeds: [giveaway] });
    }

  }

};
