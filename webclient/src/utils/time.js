export const formatTime = (totalSeconds, stripHour = false) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
  const seconds = Math.round((totalSeconds - (hours * 3600) - (minutes * 60)) * 100) / 100

  const fHours = hours < 10 ? '0' + hours : hours
  const fMinutes = minutes < 10 ? '0' + minutes : minutes
  const fSeconds = seconds < 10 ? '0' + seconds : seconds

  if (stripHour && fHours === '00') {
    return `${fMinutes}:${fSeconds}`
  }
  return `${fHours}:${fMinutes}:${fSeconds}`
}

