import React, { useEffect, useState } from 'react'
import ThemeSelect from './components/ThemeSelect/ThemeSelect'
import Timer from './components/Timer/Timer'
import Button from './components/Button/Button'
import themes from './assets/themes'
import './App.css'

function App() {
  const [theme, setTheme] = useState(themes.forest)
  const [audio, setAudio] = useState(new Audio(theme.audio))
  const [start, setStart] = useState(false)
  const [clear, setClear] = useState(false)
  const [pause, setPause] = useState(true)
  // const [intervalId, setIntervalId] = useState()

  useEffect(() => {
    if (start) {
      audio.setAttribute('loop', 'loop')
      audio.play()
      // const delay = (audio.duration - 0.7) * 1000
      // let interval = setInterval(() => {
      //   audio.currentTime = 1
      //   audio.play()
      // }, delay)
      // setIntervalId(interval)
    } else {
      audio.pause()
      // clearInterval(intervalId)
    }
  }, [start])

  const changeHandler = (e) => {
    setTheme(themes[e.target.value])
    setAudio(new Audio(themes[e.target.value].audio))
  }

  const clearHandler = () => {
    setStart(false)
    setClear(true)
    setTimeout(() => {
      setClear(false)
    }, 500)
  }

  const startHadler = () => {
    setStart(!start)
    setPause(!pause)
  }

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${theme.img})`,
        backgroundSize: 'cover'
      }}
    >
      <div className="wrapper">
        <div className="theme-select">
          <ThemeSelect
            options={Object.keys(themes)}
            handler={changeHandler}
            disabled={start}
          />
        </div>
        <div className="control-panel">
          <div className="contol-panel__timer">
            <Timer start={start} clear={clear} pause={pause} setStart={setStart} />
          </div>
          <div className='control-panel__buttons'>
            <Button handler={startHadler} value={start ? 'Pause' : 'Start'} />
            <Button handler={clearHandler} value='Clear timer' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
