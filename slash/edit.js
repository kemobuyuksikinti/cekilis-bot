module.exports = {
    name: 'edit',
    description: '🎉 Bir çekilişi düzenleyin',

    options: [
        {
            name: 'çekiliş',
            description: 'Bitecek çekilişin mesaj IDsini yazınız.',
            type: 'STRING',
            required: true
        },
        {
            name: 'süre',
            description: 'Bahsedilen çekilişin  ne kadar süre sonra biteceğini yazınız!',
            type: 'STRING',
            required: true
        },
        {
            name: 'kazananlar',
            description: 'Çekilişin kaç kazananın olması lazımsa o kadar değer yazınız.',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'ödül',
            description: 'Çekilişin ödülü ne olmalıysa onu yazınız.',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        // If the member doesn't have enough permissions
        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: Çekilişleri başlatmak için mesajları yönetme izinlerine sahip olmanız gerekir.',
                ephemeral: true
            });
        }
        const gid = interaction.options.getString('giveaway');
        const time = interaction.options.getString('duration');
        const winnersCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        
        await interaction.deferReply({
         ephemeral: true
        })
        // Edit the giveaway
        try {
        await client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
        })
        } catch(e) {
return interaction.editReply({
            content:
                `Girilen mesaj IDsine sahip çekiliş bulunamadı: \`${gid}\``,
            ephemeral: true
        });
        }
        interaction.editReply({
            content:
                `Bu çekiliş şimdi düzenlendi!`,
            ephemeral: true
        });
    }

};
