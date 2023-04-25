import React, { useState, useEffect } from "react"
import { getCurrentTime } from "../actions"

export default function Time() {
  const [allServerTimes, setAllServerTimes] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isFirstFetch, setIsFirstFetch] = useState(true)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000) // update every second

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const fetchTime = async () => {
      const getCurrentTimeAsync = getCurrentTime()
      const currentServerTime = await getCurrentTimeAsync()
      setAllServerTimes((prevServerTimes) => [...prevServerTimes, currentServerTime])
      setIsFirstFetch(false)
    }

    if (isFirstFetch) {
      fetchTime() // set the first fetched time
    } else {
      const intervalId = setInterval(() => {
        fetchTime()
      }, 30000) // update every 30 seconds

      return () => clearInterval(intervalId)
    }
  }, [isFirstFetch])

  const formatTimeDifference = (time1, time2) => {
    const timeDiffInMillis = Math.abs(time1.getTime() - time2.getTime())
    const hours = Math.floor(timeDiffInMillis / 3600000)
    const minutes = Math.floor((timeDiffInMillis - hours * 3600000) / 60000)
    const seconds = Math.floor((timeDiffInMillis - hours * 3600000 - minutes * 60000) / 1000)
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }

  return (
    <div id="time-display-wrapper">
      <h1>Time</h1>

      {isFirstFetch && allServerTimes.length < 0 && (
        <div className="current-difference" key={allServerTimes[0]}>
          <div>Server Time {allServerTimes[0]}</div>
        </div>
      )}
      {/* only after the first fetch we render the following */}
      {!isFirstFetch && (
        <>
          <div className="flex-row">
            <div>Server Time</div>
            <div>Current Difference</div>
          </div>
          {allServerTimes.map((time) => (
            <div className="current-difference" key={time}>
              <div>{time}</div>

              <div> {formatTimeDifference(currentTime, new Date(time * 1000))}</div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
