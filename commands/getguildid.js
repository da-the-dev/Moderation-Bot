module.exports = {
    "name": 'get_guild_id',
    "allowedRoles" : [
        '643538663963099176'
    ],
    exec(msg, args) {
        console.log(msg.guild.id)
    }
}