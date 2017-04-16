import React from 'react'
import {List, ListItem} from 'material-ui/List'
import {darkBlack} from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'

import {formatTime} from '../utils/time'

export default class MarkerList extends React.Component {
  render () {
    const { markerSearch, seekTo } = this.props;
    const mappedMarkers = markerSearch.markers.map((marker, i) => {
      let {context, words} = marker
      let timeStamps = words.map(word => word.time)
      let searchedWords = words.map(word => word.word)
      searchedWords.forEach((w) => {
        context = context.replace(w, `<span style="color: black; font-weight: 900;">${w}</span>`)
      })
      return (
        <span onTouchTap={() => seekTo(timeStamps[0])} key={i}>
          <ListItem
            primaryText={<div class='marker-time'>{formatTime(timeStamps[0])}</div>}
            secondaryText={
               <p dangerouslySetInnerHTML={{__html: context}}></p>
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
