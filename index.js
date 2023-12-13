
const buildTimeSheet = require('./buildTimeSheet')
const classifySessions = require('./classifySessions')
const downloadMessages = require('./downloadMessages')
const classifyMessages = require('./classifyMessages')

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