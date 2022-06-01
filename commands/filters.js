const { MessageEmbed } = require('discord.js');

const filters = ['3d', 'bassboost', 'echo', 'karaoke', 'nightcore', 'vaporwave', 'flanger', 'gate', 'haas', 'reverse', 'surround', 'mcompand', 'phaser', 'tremolo', 'earwax'];

module.exports = {
  name: 'filter',
  aliases: ['filters'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const error = new MessageEmbed()
    .setColor('BLUE')
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Invalid Filter`)
    .addField('Available Filters', filters.map(x => `\`${x}\``).join(', '))
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing in the queue right now!`)
    if (!args) return message.channel.send(`Please input the filters!`)
    if (!filters.includes(args)) return message.channel.send({ embeds: [error] })
    if (args[0] === 'off' && queue.filters?.length) queue.setFilter(false)
    else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
    else if (args[0]) return message.channel.send(`${client.emotes.error} | Not a valid filter`)
    message.channel.send(`Current Queue Filter: \`${queue.filters.join(', ') || 'Off'}\``)
  }
}
