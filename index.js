
const download = require('./downloadMessages/index')
const processMsg = require('./processMessages/index')
const main = () =>{
  const options = {
    download,
    processMsg,
  }
  const option = process.argv[2]

  options[option]()
}

main()