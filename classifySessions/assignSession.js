const { map } = require("@laufire/utils/collection");

const sessionsMap = {
  'connected': 'start', 
  'break': 'end', 
  'back': 'start', 
  'leaving': 'end',
  'invalid': 'invalid',
}

const assignSession = ({data}) => ({
  data: map(data, (message) =>{
    const session = sessionsMap[message.tag] || 'invalid'

    return { ...message, session }
  })
})

module.exports=assignSession;