import React from 'react'
import {AppLayout} from '../components/layout/AppLayout';

const Home = () => {
  return (
    <div>Chat</div>
  )
}
const WrappedChat = AppLayout()(Home)

export default WrappedChat;