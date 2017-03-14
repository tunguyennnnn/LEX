import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {darkBlack} from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
  const seconds = Math.round((totalSeconds - (hours * 3600) - (minutes * 60)) * 100) / 100

  const fHours = hours < 10 ? '0' + hours : hours
  const fMinutes = minutes < 10 ? '0' + minutes : minutes
  const fSeconds = seconds < 10 ? '0' + seconds : seconds

  return `${fHours}:${fMinutes}:${fSeconds}`
}

export default class MarkerList extends React.Component {
  render () {
    const { markers } = this.props

    const mappedMarkers = markers.map((marker, i) => {
      return (
        <span key={i}>
          <ListItem
            primaryText={<div class='marker-time'>{formatTime(marker.time)}</div>}
            secondaryText={
              <p>
                This is the text context where
                <span style={{color: darkBlack}}> {marker.text} </span>
                appears in.
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider />
        </span>
      )
        // .reduce((accu, elem) => {
        // return accu === null ? [elem] : [...accu, <Divider inset />, elem]
      // }, null)
    })

    return (
      <List>
        {mappedMarkers}
      </List>
    )
  }
}
