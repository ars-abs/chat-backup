const { reduce } = require("@laufire/utils/collection")
const classifyLeaving = require("./classifiers/classifyLeaving")
const classifyMins = require("./classifiers/classifyMins")
const classifyTags = require("./classifiers/classifyTags")

const pipes = [classifyMins,classifyLeaving,classifyTags]

const classify = (message)=>reduce(pipes, (acc,pipe)=>{
  return {...acc, ...pipe({message})}
}, {tag: 'unknown', classified: false})

module.exports=classify