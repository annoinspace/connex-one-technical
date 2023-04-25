import "./App.css"

import TimeMetrics from "./components/TimeMetrics"

function App() {
  return (
    <div className="App">
      <div id="loading">bottom</div>
      <div id="time-metrics-wrapper">
        <TimeMetrics />
      </div>
    </div>
  )
}

export default App
