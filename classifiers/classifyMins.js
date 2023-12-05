const regex = /^\s*(\d+)\s*m(in|ins)?\s*$/i;

const classifyMins = ({message, ...rest}) => {
  const text = (message || '').toLowerCase().trim();
  const result = !!text.match(regex) 
    ?{tag:'break', classified: true}
    :{}

  return {
    ...rest,
    message:text,
    ...result
  }
}

module.exports = classifyMins