import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {darkBlack} from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'

import {formatTime} from '../utils/time'

export default class MarkerList extends React.Component {
  render () {
    const { markers, seekTo } = this.props

    const mappedMarkers = markers.map((marker, i) => {
      return (
        <span onTouchTap={() => seekTo(marker.time)} key={i}>
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
