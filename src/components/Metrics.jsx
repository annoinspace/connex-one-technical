import React from "react"

export default function Metrics({ text }) {
  return (
    <div id="metrics-wrapper">
      <h1>Metrics</h1>
      <pre>{text}</pre>
    </div>
  )
}
