const Discord = require('discord.js')
const fs = require('fs')
const config = require('./config.json')
var client = new Discord.Client()

const token = require('/Users/alexeytkachenko/Documents/Tokens/advanced-moderation.json').token

client.commands = new Array
fs.readdirSync(`${process.cwd()}/commands`).filter(f => f.endsWith('js')).forEach(f => {
    var command = require(`${process.cwd()}/commands/${f}`)
    client.commands.push(command)
})

client.login(token)

client.on('ready', () => {
    console.log("Ready")
})

client.on('message', msg => {  
    if (!msg.content.startsWith(config.prefix) || (msg.author.bot)) {
        return 0
    }
    var command = msg.content.split(' ').shift()
    command = command.substr(1)

    var args = msg.content.split(' ')
    args.shift()

    client.commands.forEach(c => {
        if (c.name == command) {
            c.allowedRoles.forEach(r => {
                if (msg.member.roles.has(r)) {
                    c.exec(msg, args)
                    return 0
                }
            }) 
            
        }
    })
    
})