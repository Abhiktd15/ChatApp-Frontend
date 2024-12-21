import React, { lazy, Suspense, useEffect } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import { LayoutLoader } from './components/layout/Loaders.jsx'
import axios from "axios"
import { server } from './constants/config.js'
import { useDispatch, useSelector } from 'react-redux'
import { userExists, userNotExists } from './store/reducers/auth.js'
import { Toaster } from 'react-hot-toast'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Chat = lazy(() => import('./pages/Chat'))
const Groups = lazy(() => import('./pages/Groups'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'))
const Dashboard = lazy(() => import('./pages/admin/Dashboard.jsx'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement.jsx'))
const ChatManagement = lazy(() => import('./pages/admin/ChatManagement.jsx'))
const MessageManagement = lazy(() => import('./pages/admin/MessageManagement.jsx'))

const App = () => {

  const dispatch = useDispatch()
  const {user,loader}  = useSelector(state => state.auth)

  useEffect(() => {
    axios.get(`${server}/api/v1/user/me`,{withCredentials:true}).then(({data}) => dispatch(userExists(data.user))).catch((err) => dispatch(userNotExists()))
  },[dispatch])

  return loader ? (
    <LayoutLoader/>
  ):
  (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
        <Routes>
          <Route element={<ProtectRoute user={user}/>}>
            <Route path='/' element={<Home/>} />
            <Route path="/chat/:chatId" element={<Chat/>} />
            <Route path="/groups" element={<Groups/>} />
          </Route>

          <Route path="/login" element={
            <ProtectRoute user={!user} redirect='/'>
              <Login/>
            </ProtectRoute>
          } />
          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminLogin/>}/>
          <Route path="/admin/dashboard" element={<Dashboard/>}/>
          <Route path="/admin/users" element={<UserManagement/>}/>
          <Route path="/admin/messages" element={<MessageManagement/>}/>
          <Route path="/admin/chats" element={<ChatManagement/>}/>

          <Route path="*" element={<NotFound/>} />

        </Routes>
      </Suspense>
          <Toaster position='bottom-center'/>
    </BrowserRouter>
  )
}

export default App
