import { AppBar, Backdrop, Box, IconButton,  Toolbar, Tooltip, Typography } from '@mui/material'
import {Menu as MenuItem,Search as SearchIcon,Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Notifications as NotificationsIcon} from '@mui/icons-material'
import React, { lazy, Suspense, useState } from 'react'
import { orange } from '../../constants/color'
import { useNavigate } from 'react-router-dom'
const Search = lazy(() => import('../specific/Search'))
const NewGroup = lazy(() => import('../specific/NewGroup'));
const Notifications = lazy(() => import('../specific/Notifications'))

const Header = () => {
  const navigate = useNavigate(null)

  const [isMobile,setIsMobile] = useState(false);
  const [isSearch,setIsSearch] = useState(false);
  const [isNewGroup,setIsNewGroup] = useState(false);
  const [isNotification,setIsNotification] = useState(false);

  
  const handleMobile = () => {
    // Handle mobile menu toggle
    setIsMobile(prev => !prev)
    
  }
  const openSearchDialog = () => {
    // Open search dialog
    setIsSearch(prev => !prev)
  }
  const openNewGroup = () => {
    // Open new group dialog
    setIsNewGroup(prev => !prev)
  }
  const openNotification = () => {
    // Open new group dialog
    setIsNotification(prev => !prev)
  }
  const navigateToGroup = () => navigate('/groups')

  const logoutHandler = () => {
    // Handle logout logic
    console.log('User logged out')
  }
  return (
    <>
      <Box sx={{flexGrow:1}} height={'4rem'}>
        <AppBar position='static' sx={{
          bgcolor:orange
        }}>
          <Toolbar>
            <Typography
              variant='h6'
              sx={{
                display:{xs:'none',sm:'block'}
              }}
            >
              Talkative
            </Typography>
            <Box
              sx={{
                display:{xs:'block',sm:'none'}
              }}
            >
              <IconButton color='inherit' onClick={handleMobile}>
                <MenuItem/>
              </IconButton>
            </Box>
            <Box sx={{
              flexGrow:1
            }}>

            </Box>
            
            <Box>
              {/* Search Icon */}
              <IconBtn icon={<SearchIcon/>} title="Search" onClick={openSearchDialog}/>
              {/* New Group Creat Icon */}
              <IconBtn icon={<AddIcon/>} title="New Group" onClick={openNewGroup}/>
              {/* Manage Groups Icon */}
              <IconBtn icon={<GroupIcon/>} title="Manage Groups" onClick={navigateToGroup}/>
              {/* Notifications button */}
              <IconBtn icon={<NotificationsIcon/>} title="Notification" onClick={openNotification}/>
              {/* Logout Button */}
              <IconBtn icon={<LogoutIcon/>} title="Logout" onClick={logoutHandler}/>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open/>}>
          <Search/>
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open/>}>
          <NewGroup/>
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open/>}>
          <Notifications/>
        </Suspense>
      )}
    </>
  )
}

const IconBtn = ({title,icon,onClick}) =>{
  return(
    <Tooltip title={title}>
      <IconButton color='inherit' size='large' onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  )
}

export default Header