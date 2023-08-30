import React, { useState, useEffect } from "react"
import "./stopwatch.css"
const Stopwatch: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [lapTime, setLapTime] = useState<number>(0)
  const [laps, setLaps] = useState<lapItem[]>([])
  const [counter, setCounter] = useState<number>(1)

  interface lapItem {
    lap: number
    time: number
  }

  useEffect(() => {
    let interval: number | undefined

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 10)
        setLapTime((prevTime) => prevTime + 10)
      }, 10)
    } else if (!isRunning && elapsedTime !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleLap = () => {
    if (isRunning) {
      setLaps([{ lap: counter, time: lapTime }, ...laps])
      setLapTime(0)
      setCounter((prev) => prev + 1)
    } else {
      setLaps([])
      setLapTime(0)
      setElapsedTime(0)
      setCounter(1)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = (time % 1000).toString().padStart(2, "0").substr(0, 2)

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds}`
  }

  const startSopButtonClass = isRunning ? "stop-btn" : "start-btn"

  return (
    <div className="stopwatch-container">
      <header>
        <p>Stopwatch</p>
      </header>
      <div className="time-container">
        <p className="time">{formatTime(elapsedTime)}</p>
      </div>
      <div className="button-container">
        <button
          className="gen-button lap-reset-btn"
          onClick={handleLap}
          disabled={!isRunning && elapsedTime === 0}
        >
          {isRunning || elapsedTime == 0 ? "Lap" : "Reset"}
        </button>
        <div className="dots">
          <div className="dot"></div>
          <div className="dot-empty"></div>
        </div>
        <button
          className={`gen-button ${startSopButtonClass}`}
          onClick={handleStartStop}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
      <div className="laps-container">
        <ul className="laps-table">
          {(isRunning || elapsedTime > 0) && (
            <li className="lap">
              {" "}
              <span>{`Lap ${counter}`}</span>
              <span> {` ${formatTime(lapTime)}`}</span>
            </li>
          )}
          {laps.map((lap, index) => (
            <li className="lap" key={index}>
              <span>{`Lap ${lap.lap}`}</span>
              <span> {` ${formatTime(lap.time)}`}</span>
            </li>
          ))}
        </ul>
      </div>
      <footer></footer>
    </div>
  )
}

export default Stopwatch
