import React from 'react'

import Player_Header from '../components/Player_Header'
import { useLocation } from 'react-router-dom'

const PlayerPage = () => {
  const { state } = useLocation(); 
  
  return (
    <Player_Header data = { state } />
  )
}

export default PlayerPage