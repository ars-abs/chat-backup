
const buildTimeSheet = require('./buildTimeSheet')
const classifySessions = require('./classifySessions')
const downloadMessages = require('./downloadMessages/index')
const classifyMessages = require('./processMessages/index')

const main = () =>{
  const options = {
    download: downloadMessages,
    messages: classifyMessages,
    sessions: classifySessions,
    build: buildTimeSheet,
  }
  const option = process.argv[2]

  options[option]()
}

main()