export default function getMessage () {
  let message
  //compare hour
  let date = new Date().getHours()
  date < 18 ? message = 'gm' : message = 'gn'

  return message
}