const { map } = require("@laufire/utils/collection");
const dayjs = require("dayjs");

const sessionsMap = {
  'connected': 'start', 
  'logged in': 'start',
  'back': 'start', 
  'break': 'end', 
  'dinner': 'end',
  'leaving': 'end',
  'logging off': 'end', 
  'logging off for the day': 'end',
  'disconnected': 'end', 
  'logged off': 'end', 
  'left': 'end', 
  'lunch': 'end',
  'invalid': 'unknown',
}

const assignSession = ({data}) => ({
  data: map(data, (message) =>{
    const dateTime = dayjs(message.time).format('YYYY-MM-DD HH:mm:ss');
    const session = sessionsMap[message.tag] || 'unknown'

    return { ...message, dateTime, session }
  })
})

module.exports=assignSession;