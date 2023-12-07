const regex = /^\s*(\d+)\s*m(in|ns|ins|')?'?\s*(break)?$/i;

const classifyMins = ({ message, classified }) => {

  const text = (message || '').toLowerCase().trim();
  const result = !!text.match(regex) ? { tag: 'break', classified: true } : {}

  return !classified
    ? {
      message: text,
      ...result
    }
    : {}
}

module.exports = classifyMins