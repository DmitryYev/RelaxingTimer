import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Timer.css'

const Timer = ({ start, clear, pause, setStart }) => {
    const [timer, setTimer] = useState({ minutes: '', seconds: '' })
    const [timeoutId, setTimeoutId] = useState()

    useEffect(() => {
        if (clear) {
            clearTimeout(timeoutId)
            clearTimer()
        }
        pause && clearTimeout(timeoutId)
    }, [clear, pause])

    useEffect(() => {
        if (start) {
            let timeout = setTimeout(reduceTimer, 1000)
            setTimeoutId(timeout)
        }
    }, [start, timer])

    const clearTimer = () => {
        setTimer({ minutes: '', seconds: '' })
    }

    const reduceTimer = () => {
        let minutes = timer.minutes
        let seconds = timer.seconds

        if ((minutes === '00' || !minutes) && (seconds === '00' || !seconds)) {
            setStart(false)
            return
        }

        if (minutes > 0 && (seconds === '00' || !seconds)) {
            setTimer({
                minutes: minutes <= 10 ? `0${--minutes}` : --minutes,
                seconds: '59'
            })
            return
        }
        
        setTimer({
            ...timer,
            seconds: seconds <= 10 ? `0${--seconds}` : --seconds
        })
    }

    const changeHadler = (e) => {
        let { value, className } = e.target

        if (value.length > 2) value = `${+value}`.slice(0, 2)
        if (value < 10) value = value.padStart(2, '0')
        if (value > 60) value = '59'

        switch (className) {
            case 'input minutes': setTimer({ ...timer, minutes: value })
                break
            case 'input seconds': setTimer({ ...timer, seconds: value })
                break
            default: return
        }
    }

    return (
        <>
            <input
                type="number"
                value={timer.minutes}
                placeholder='00'
                min='0'
                max='60'
                className='input minutes'
                onChange={changeHadler}
                disabled={start}
            />
            <span className='delimiter'>:</span>
            <input
                type="number"
                value={timer.seconds}
                placeholder='00'
                min='0'
                max='60'
                className='input seconds'
                onChange={changeHadler}
                disabled={start}
            />
        </>
    )
}

Timer.propTypes = {
    start: PropTypes.bool,
    clear: PropTypes.bool,
    pause: PropTypes.bool,
    setStart: PropTypes.func
}

export default Timer