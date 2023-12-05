const { map } = require('@laufire/utils/collection')
const test = require('./test')
const { peek, pretty } = require('@laufire/utils/debug')
const { convert } = require('html-to-text');


const messages = [
  "breal",
  "connnect @ 3 pm",
  "lumch",
  "bck",
  "eaving",
  "ak",
  "bcak",
  "break@12",
  "logged in @10",
  "logging off.",
  "logged out",
  "leave at 5pm",
  "leave",
  "leaving",
  "leaving for   the day",
  "now leaving for a day",
  "back @ 10.45 pm",
  "back again @7:55",
  "leave for the day",
]

peek(pretty(map(messages, (message)=>test(convert(message))) ,2)) 