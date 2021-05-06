export default function parseTimeToCook(time) {
  let parsedTime = time + " mins"
  if (parseInt(time) === 60) {
    parsedTime = "1 hour"
  } else if (parseInt(time) === 120) {
    parsedTime = "2 hours+"
  }

  return parsedTime
}
