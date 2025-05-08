// Write your code here
import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timeLimit: 25,
      remainingTime: 25 * 60,
      isRunning: false,
    }

    this.intervalRef = null
  }

  componentWillMount() {
    clearInterval(this.intervalRef)
  }

  formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  handleStartPause = () => {
    const {isRunning} = this.state
    if (isRunning) {
      clearInterval(this.intervalRef)
    } else {
      this.intervalRef = setInterval(() => {
        this.setState(prevState => {
          if (prevState.remainingTime > 0) {
            return {remainingTime: prevState.remainingTime - 1}
          } else {
            clearInterval(this.intervalRef)
            return {isRunning: false}
          }
        })
      }, 1000)
    }
    this.setState({isRunning: !isRunning})
  }

  handleReset = () => {
    clearInterval(this.intervalRef)
    this.setState(prevState => ({
      remainingTime: prevState.timeLimit * 60,
      isRunning: false,
    }))
  }

  handleIncrease = () => {
    this.setState(prevState => {
      const newList = prevState.timeLimit + 1
      return {
        timeLimit: newList,
        remainingTime: newList * 60,
      }
    })
  }

  handleDecrease = () => {
    this.setState(prevState => {
      if (prevState.timeLimit > 1) {
        const newLimit = prevState.timeLimit - 1
        return {
          timeLimit: newLimit,
          remainingTime: newLimit * 60,
        }
      }
      return null
    })
  }

  render() {
    const {timeLimit, remainingTime, isRunning} = this.state
    return (
      <div className="digital-timer-container">
        <h1>Digital Timer</h1>

        <div className="timer-section">
          <div className="timer-display">
            <div className="time-left">
              <h1 className="timer">{this.formatTime(remainingTime)}</h1>
              <p className="para">{isRunning ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          <div className="action">
            <div className="controls">
              <button
                className="control-button"
                onClick={this.handleStartPause}
              >
                {' '}
                {isRunning ? (
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="pause icon"
                  />
                ) : (
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="play icon"
                  />
                )}
                {isRunning ? 'Pause' : 'Start'}
              </button>

              <button onClick={this.handleReset} className="control-button">
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>

            <div className="time-controls">
              <button
                className="time-button"
                disabled={isRunning}
                onClick={this.handleDecrease}
              >
                -
              </button>
              <span className="range">{timeLimit} min</span>
              <button
                className="time-button"
                disabled={isRunning}
                onClick={this.handleIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
