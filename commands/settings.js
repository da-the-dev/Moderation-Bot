const Discord = require('discord.js')
const config = require('../config.json')
const fs = require('fs')
var testMessage = new Discord.Message

var lettersArray = {
    'a': '🇦',
    'b': '🇧',
    'c': '🇨',
    'd': '🇩',
    'e': '🇪',
    'f': '🇫'

}
// testMessage.author.id
module.exports = {
    "name": "settings",
    "allowedRoles": [
        '643538663963099176'
    ],
    exec(msg, args) {
        var menu = new Discord.RichEmbed()
            .setTitle("**Settings menu**")
            .addField('Change the prefix', '(1)')
        var menuMessage = msg.channel.send(menu)
            .then(async m => {
                await m.react('🇦')
                await m.react('🇧')

                const filter = (reaction, user) => //Filter for reactions
                    (
                        reaction.emoji.name === lettersArray.a //Prefix
                        || reaction.emoji.name === lettersArray.b
                        || reaction.emoji.name === lettersArray.c
                    )
                    && user.id === msg.author.id //and the specific user

                await m.awaitReactions(filter, { max: 1 }) //Collecting the reaction
                    .then(collected => {
                        switch (collected.array()[0].emoji.name) {
                            case lettersArray.a:
                                msg.reply('type a symbol to use as a prefix.')
                                const filter = m => m.author.id === msg.author.id
                                msg.channel.awaitMessages(filter, { max: 1 }) //Waiting for the new prefix
                                    .then(collected => {
                                        msg.reply(`the new prefix is \`${collected.array()[0].content}\``)
                                        config.prefix = collected.array()[0].content
                                        fs.writeFileSync(`${process.cwd()}/config.json`, JSON.stringify(config, null, 2))
                                    })
                                break
                            case lettersArray.b:
                                msg.reply('b')
                        }
                    })
            })

    }
}