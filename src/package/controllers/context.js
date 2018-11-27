import React from 'react'

export const PlayerContext = React.createContext()

export const PlayerConsumer = Comp => { // anonymous function will show "UnKnown" in React Dev Tool
  return function PlayerConsumerWrapper(props) {
    return (
    <PlayerContext.Consumer>
      {context => <Comp {...props}  {...context} />}
    </PlayerContext.Consumer>
    )
  }
}