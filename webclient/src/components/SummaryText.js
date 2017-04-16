import React from 'react'

export default class SummaryText extends React.Component {
  render () {
    const { summary } = this.props
    return (
      <div class='summary-text-box'>
        <h5 class="summary-title">Summary</h5>
        <p class='summary-body'>{ summary }</p>
      </div>
    )
  }
}
