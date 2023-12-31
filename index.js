const config = require('./config')
const buildTimeSheet = require('./buildTimeSheet')
const classifySessions = require('./classifySessions')
const downloadMessages = require('./downloadMessages')
const classifyMessages = require('./classifyMessages')

const main = (context) =>{
  const options = {
    download: downloadMessages,
    messages: classifyMessages,
    sessions: classifySessions,
    build: buildTimeSheet,
  }
  const option = process.argv[2]

  options[option](context)
}

main({config})