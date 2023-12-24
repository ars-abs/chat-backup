const { map } = require("@laufire/utils/collection");

const tagsMap = {
  'logged in': 'back',
  'logging off': 'break', 
  'logged off': 'break', 
  'disconnected': 'break', 
  'lunch': 'break',
  'dinner': 'break',
  'logging off for the day': 'leaving',
  'left': 'leaving', 
}

const assignTags = ({messages}) => ({
  messages: map(messages, (message) =>{
    const tag = tagsMap[message.tag] || message.tag

    return { ...message, tag }
  })
})

module.exports=assignTags;