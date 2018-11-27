import React, { Component } from 'react'
import { PlayerConsumer } from './context'

class Player extends Component {
  render() {
    let { Component, ...rest } = this.props
    if (!Component) return null
    return <Component {...rest}/>
  }
}

export default PlayerConsumer(Player)
