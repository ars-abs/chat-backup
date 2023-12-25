const { map } = require("@laufire/utils/collection");

const sessionsMap = {
  'connected': 'start', 
  'break': 'end', 
  'back': 'start', 
  'leaving': 'end',
  'invalid': 'unknown',
}

const assignSession = ({data}) => ({
  data: map(data, (message) =>{
    const session = sessionsMap[message.tag] || 'unknown'

    return { ...message, session }
  })
})

module.exports=assignSession;