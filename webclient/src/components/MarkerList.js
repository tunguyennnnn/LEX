import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {darkBlack} from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'

import {formatTime} from '../utils/time'

export default class MarkerList extends React.Component {
  render () {
    const { markerSearch, seekTo } = this.props;
    const mappedMarkers = markerSearch.markers.map((marker, i) => {
      let {context, words} = marker;
      let timeStamps = words.map(word => word.time);
      return (
        <span onTouchTap={() => seekTo(timeStamps[0])} key={i}>
          <ListItem
            primaryText={<div class='marker-time'>{formatTime(timeStamps[0])}</div>}
            secondaryText={
              <p>
                {context}
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider />
        </span>
      )
    })

    return (
      <List>
        {mappedMarkers}
      </List>
    )
  }
}
