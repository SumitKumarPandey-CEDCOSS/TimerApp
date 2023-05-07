import { useState, useEffect } from 'react'
import moment from 'moment'

function App () {
  const [timers, setTimers] = useState([])
  const [newTimer, setNewTimer] = useState('')

  const handleNewTimerChange = event => {
    setNewTimer(event.target.value)
  }

  const handleNewTimerSubmit = event => {
    event.preventDefault()
    const seconds = parseInt(newTimer, 10)
    if (!isNaN(seconds)) {
      const expiration = moment().add(seconds, 'seconds')
      setTimers([...timers, { expiration }])
      setNewTimer('')
    }
  }

  const handleTimerClose = index => {
    setTimers(timers.filter((timer, i) => i !== index))
  }

  useEffect(() => {
    const interval = setInterval(
      () =>
        setTimers(prevTimers =>
          prevTimers.filter(timer => {
            const remainingSeconds = timer.expiration.diff(moment(), 'seconds')
            if (remainingSeconds <= 0) {
              return false
            }
            return true
          })
        ),
      10
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='App'>
      <div className='timer-container'>
        {timers.map((timer, index) => {
          const remainingSeconds = timer.expiration.diff(moment(), 'seconds')
          const createdTime = timer.expiration.format('MM.DD.YYYY hh:mm:ss')
          const remainingTime = `${Math.floor(remainingSeconds / 60)},${
            remainingSeconds % 60 < 10 ? '0' : ''
          }${remainingSeconds % 60}`
          return (
            <div className='timer' key={index}>
              <div className='badge'>
                <div>{remainingTime}</div>
                <span>{createdTime}</span>
                <button onClick={() => handleTimerClose(index)}>x</button>
              </div>
            </div>
          )
        })}
      </div>
      <div className='form-container'>
        <form onSubmit={handleNewTimerSubmit}>
          <label>New Timer</label>
          <br />
          <input type='text' value={newTimer} onChange={handleNewTimerChange} />
          <br />
          <button type='submit'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default App
