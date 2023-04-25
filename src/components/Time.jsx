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
      fetchTime()
    } else {
      const intervalId = setInterval(() => {
        fetchTime()
      }, 30000)

      return () => clearInterval(intervalId)
    }
  }, [isFirstFetch])

  return (
    <div id="time-display-wrapper">
      <h1>Time</h1>
      <div>Local Time {currentTime.toLocaleTimeString()}</div>
      {isFirstFetch && allServerTimes.length > 0 && (
        <div className="current-difference" key={allServerTimes[0]}>
          <div>Server Time {allServerTimes[0]}</div>
          <div>current difference</div>
        </div>
      )}
      {!isFirstFetch && (
        <>
          {allServerTimes.map((time) => (
            <div className="current-difference" key={time}>
              <div>Server Time - {time}</div>
              <div>current difference</div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
