const { reduce } = require("@laufire/utils/collection")
const classifyLeaving = require("./classifiers/classifyLeaving")
const classifyMins = require("./classifiers/classifyMins")
const classifyTags = require("./classifiers/classifyTags")
const classifyWordByWord = require("./classifiers/classifyWordByWord")

// TODO: use js/utils classify
const pipes = [
  classifyMins, 
  classifyLeaving, 
  classifyTags,
  classifyWordByWord
]

const classify = (message) => reduce(pipes, (acc, pipe) => {
  const { classified } = acc
  return { ...acc, ...pipe({ message, classified }) }
}, { tag: 'unknown', classified: false })

module.exports = classify