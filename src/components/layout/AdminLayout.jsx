import { Close as CloseIcon, Dashboard as DashboardIcon,ExitToApp as ExitToAppIcon,Groups as GroupsIcon,ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon} from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom'
import { matBlack } from '../../constants/color'

const adminTabs = [
    {
        name:"Dashboard",
        path:"/admin/dashboard",
        icon: <DashboardIcon />
    },
    {
        name:"Users",
        path:"/admin/users",
        icon: <ManageAccountsIcon />
    },
    {
        name:"Chats",
        path:"/admin/chats",
        icon: <GroupsIcon />
    },
    {
        name:"Messages",
        path:"/admin/messages",
        icon: <MessageIcon />
    },
]

const Link = styled(LinkComponent)`
    text-decoration: none;
    border-radius:2rem;
    padding: 1rem 2rem;
    color:black;
    &:hover{
        color: rgba(0,0,0,0.54);
    }
`;

const Sidebar = ({w="100%"}) => {
    const location = useLocation()
    const logoutHandler = () => {
        console.log('logged out')
    }
    return(
        <Stack 
            width={w}
            direction={'column'}
            p={'3rem'}
            spacing={'3rem'}
        >
            <Typography variant='h5' textTransform={"uppercase"}>Talkative</Typography>

            <Stack spacing={'1rem'}>
                {adminTabs.map((tab) => (
                    <Link
                        key={tab.path}
                        to={tab.path}
                        sx={
                            location.pathname===tab.path && {
                                bgcolor:matBlack,
                                color:"white",
                                "&:hover":{
                                    color:"white"
                                }
                            }
                        }
                    >
                        <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                            {tab.icon}
                            <Typography fontSize={'1.2rem'}>{tab.name}</Typography>
                        </Stack>
                    </Link>
                ))}

                <Link onClick={logoutHandler}>
                    <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                        <ExitToAppIcon/>
                        <Typography fontSize={'1.2rem'}>Logout</Typography>
                    </Stack>
                </Link>
            </Stack>
        </Stack>

    )
}
const isAdmin = true
const AdminLayout = ({children}) => {
    const [isMobile,setIsMobile] = useState(false)
    if(!isAdmin) return <Navigate to={'/admin'} />

    const handleMobile = () => setIsMobile(!isMobile)
    const handleClose = () => setIsMobile(false)
    return (
        <Grid container minHeight={'100vh'}>
            <Box
                sx={{
                    display:{
                        xs:"block",
                        md:"none"
                    },
                    position:"fixed",
                    top:"1rem",
                    right:"1rem"
                }}
            >
                <IconButton onClick={handleMobile}>
                    {isMobile ? <CloseIcon/>:<MenuIcon/>}
                </IconButton>
            </Box>
            <Grid
                item 
                md={4}
                lg={3}
                sx={{
                    display:{
                        xs:"none",
                        md:"block"
                    }
                }}
            >
                {/* SIdebar */}
                <Sidebar/>
            </Grid>
            <Grid
                item
                xs={12}
                md={8}
                lg={9}
                sx={{
                    bgcolor:"#f5f5f5"
                }}
            >
                {children}
            </Grid>
            <Drawer open={isMobile} onClose={handleClose}>
                <Sidebar w="50vw"/>
            </Drawer>   
        </Grid>
    )
}

export default AdminLayout