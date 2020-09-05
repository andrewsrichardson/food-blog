export default function parseTimeToCook(time) {
  let parsedTime = time + " mins"
  if (time === 60) {
    parsedTime = "1 hr"
  } else if (time === 120) {
    parsedTime = "2 hrs+"
  }

  return parsedTime
}
