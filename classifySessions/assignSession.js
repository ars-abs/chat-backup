const { map } = require("@laufire/utils/collection");

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
    const session = sessionsMap[message.tag] || 'unknown'

    return { ...message, session }
  })
})

module.exports=assignSession;