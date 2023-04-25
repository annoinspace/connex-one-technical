import "./App.css"
import Metrics from "./components/Metrics"
import Time from "./components/Time"

function App() {
  return (
    <div className="App">
      <div id="time-metrics-wrapper">
        <Time />
        <Metrics />
      </div>
      <div id="loading">bottom</div>
    </div>
  )
}

export default App
