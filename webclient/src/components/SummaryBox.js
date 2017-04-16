import React from 'react'
import ReactDOM from 'react-dom'
import ReactScrollbar from 'react-scrollbar-js'
export default class SummaryBox extends React.Component {
  render () {
    const { summary } = this.props
    const myScrollbar = {
      height: 200
    }
    return(
      <ReactScrollbar style={myScrollbar}>
        <div class='summary-block'>
          <h5 class='summary-title'>Summary</h5>
          <p class='summary-body'>{ summary }</p>
        </div>
      </ReactScrollbar>
    )
  }
}
